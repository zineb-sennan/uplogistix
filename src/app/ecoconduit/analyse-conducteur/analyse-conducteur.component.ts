import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { ConducteurService } from 'src/app/_services/conducteur.service';

@Component({
  selector: 'app-analyse-conducteur',
  templateUrl: './analyse-conducteur.component.html',
  styleUrls: ['./analyse-conducteur.component.css']
})
export class AnalyseConducteurComponent implements OnInit {

  conducteurs: any[] = []; conducteursSelected: any[] = []; maxConducteur = 2; viewChartPrincipale:any=null;
  date = new Date();
  date_ = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.date.getDate())).slice(-2);
  search: any = {
    date_debut: new Date("2022-04-20T00:00:00"),
    date_fin: new Date(this.date_ + "T23:59:00")
  }
  chartSelected: any = [
    { index: 1, libelle: 'Conduite dangereuse', data: [] },
    { index: 2, libelle: 'Conduite dangereuse/100km', data: [] },
    { index: 3, libelle: 'Freinage brusque', data: [] },
    { index: 4, libelle: 'Emission CO2', data: [] },
    { index: 5, libelle: '???', data: [] }
  ];

  constructor(
    private conducteurService: ConducteurService,
    private ecoconduiteService: EcoconduiteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getConducteurs();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout() {
    this.authService.logout();
  }

  getConducteurs() {
    this.conducteurService.getAll(1).subscribe(
      res=>{
        this.conducteurs=res['records'];

        for (let index = 0; index < this.maxConducteur; index++) {
          this.checkConducteurs(null,this.conducteurs[index]);
          this.conducteurs[index].checked=true;
        }
      }
    )
  }

  checkConducteurs(e: any, vehicule: any) {
    if(e!=null){
      if (this.conducteursSelected.length == this.maxConducteur) {
        if (e.currentTarget.checked) {
          e.currentTarget.checked = false;
          $('.mv-error').removeClass("d-none");
        }
        else {
          this.chartSelected.forEach((chart: any) => {
            chart.data=chart.data.filter((c:any) => c.matricule != vehicule.matricule);
          });
  
          this.conducteursSelected = this.conducteursSelected.filter(v => v.id != vehicule.id);
          $('.mv-error').addClass("d-none");
        }
      }
      else if (this.conducteursSelected.length < this.maxConducteur) {
        if (e.currentTarget.checked){
          vehicule.color = (Math.round(Math.random()*255))+','+ (Math.round(Math.random()*255)) +','+ (Math.round(Math.random()*255));
          this.conducteursSelected.push(vehicule);
        }
        else if(!e.currentTarget.checked){
          this.conducteursSelected = this.conducteursSelected.filter(v => v.id != vehicule.id);
          for (let index = 0; index < this.chartSelected.length; index++) {
            this.chartSelected[index].data = this.chartSelected[index].data.filter((c:any) => c.matricule != vehicule.matricule);
          }
        }
  
        this.chartSelected.forEach((chart: any) => {
          this.getHistoriqueVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
        });
      }
    }
    else{
      vehicule.color = (Math.round(Math.random()*255))+','+ (Math.round(Math.random()*255)) +','+ (Math.round(Math.random()*255));
      this.conducteursSelected.push(vehicule);
      //
      this.chartSelected.forEach((chart: any) => {
        this.getHistoriqueVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    }
    
  }

  private getHistoriqueVehicule(vehicule: any, index:any, indexChart:any): any {
    this.ecoconduiteService.historiqueVehicule(vehicule.id, this.search).subscribe(res => {
      //01
      var _data:any=[];
      for (let index = 0; index < 20; index++) {
        var item= {"x":"val "+index, "y": this.entierAleatoire(1,20) }
        _data.push(item);
      }
      //02
      this.chartSelected[indexChart-1].data.push({ values:_data , matricule:vehicule.matricule, color:vehicule.color });  
      this.createChart(index, _data, vehicule, Math.max(..._data.map((d:any)=> d.y)));
    });
  }

  createChart(index: any, data: any, vehicule: any, maxValue:any) {
    var chart: any = $('#chart_conducteur_'+index); let myChart: any = null;
    myChart = new Chart(chart, {
      type: 'line',
      data: {
        datasets: [{
          data: data,
          label: vehicule.matricule,
          borderColor: 'rgb(' + vehicule.color + ')',
          fill: {
            target: 'origin',
            above: 'rgba(' + vehicule.color + ',0.2)',
          },
          pointBackgroundColor: 'rgba(76, 132, 255,0)',
          pointHoverBackgroundColor: 'rgb(44, 122, 228)',
          //pointHoverRadius: 3,
          //pointHitRadius: 30,
          pointBorderWidth: 0,
          pointStyle: 'rectRounded',
          borderWidth:1.5
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: { display: false },
          y: { display: false }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
    $('#max_'+index).text(maxValue);
  }

  selectChart(index: any) {
    console.log(this.chartSelected[index - 1].data,this.chartSelected[index - 1].data.length,this.maxConducteur);
    if(this.chartSelected[index - 1].data.length>=this.maxConducteur){
      this.viewChartPrincipale=true;
      $('.tchart').removeClass('active'); $('.chart-' + index).addClass('active');
      $('.col-chart').removeClass('border-bottom'); $('.col-chart-' + index).addClass('border-bottom');
      this.createChartPrincipale(this.chartSelected[index - 1]);
    }
    else
      this.viewChartPrincipale=false;
  }

  myChart:any=null;
  createChartPrincipale(infosChart: any) {
    //01
    var chart: any = $('#chart-principal');
    if (this.myChart) this.myChart.destroy();
    var _infosChart:any={
      type: 'line',
      data:{
        datasets: []
      },
      options:{
        maintainAspectRatio:false
      }
    }
    //02
    infosChart.data.forEach((chart:any) => {
      var item={ data: chart.values, label: chart.matricule, borderColor: 'rgba(' + chart.color + ',1)' };
      _infosChart.data.datasets.push(item);
    })
    //03
    this.myChart = new Chart(chart, _infosChart);
    //new Chart(chart, _infosChart);
  }

  entierAleatoire(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
