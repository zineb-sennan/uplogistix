import { Component, OnInit, ViewChild } from '@angular/core';
import { EcoconduiteService } from '../../_services/ecoconduite.service';
import { VehiculeService } from '../../_services/vehicule.service';
import { AuthService } from '../../_services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-analyse-vehicule',
  templateUrl: './analyse-vehicule.component.html',
  styleUrls: ['./analyse-vehicule.component.css']
})
export class AnalyseVehiculeComponent implements OnInit {
  viewChartPrincipale:any=null; typeFilter='jour';
  vehicules: any[] = []; vehiculesSelected: any[] = []; maxVehicule = 3;
  maxChart=5; minChartSelected=5;
  chartSelected: any = [
    { index: 1, checked:true, libelle: 'Vitesse moyenne', slug:'vitesse-moyenne', data: [] },
    { index: 2, checked:true, libelle: 'Distance parcourue', slug:'distance-parcourue', data: [] },
    { index: 3, checked:true, libelle: 'Temps de conduite', slug:'temps-conduite', data: [] },
    { index: 4, checked:true, libelle: 'Consommation l/100km', slug:'Consommation-l-100km', data: [] },
    { index: 5, checked:true, libelle: 'Emission CO2', slug:'emission-co2', data: [], last:true },
    { index: 6, libelle: '... type chart 1', slug:'emission-co2', data: [] },
    { index: 7, libelle: '... type chart 2', slug:'emission-co2', data: [], }
  ];

  constructor(
    private vehiculeService: VehiculeService,
    private ecoconduiteService: EcoconduiteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getVehiculeWitheEco();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout() {
    this.authService.logout();
  }

  getVehiculeWitheEco() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.eco_conduite);
        //
        for (let index = 0; index < this.maxVehicule; index++) {
          this.checkVehicules(null,this.vehicules[index]);
          this.vehicules[index].checked=true;
        }
      }
    )
  }

  checkVehicules(e: any, vehicule: any) {
    if(e!=null){
      if (this.vehiculesSelected.length == this.maxVehicule) {
        if (e.currentTarget.checked) {
          e.currentTarget.checked = false;
          $('.mv-error').removeClass("d-none");
        }
        else {
          this.chartSelected.forEach((chart: any) => {
            chart.data=chart.data.filter((c:any) => c.matricule != vehicule.matricule);
          });
  
          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);
          $('.mv-error').addClass("d-none");
        }
      }
      else if (this.vehiculesSelected.length < this.maxVehicule) {
        if (e.currentTarget.checked){
          vehicule.color = (Math.round(Math.random()*255))+','+ (Math.round(Math.random()*255)) +','+ (Math.round(Math.random()*255));
          this.vehiculesSelected.push(vehicule);

          this.chartSelected.forEach((chart: any) => {
            this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
          });
        }
        else if(!e.currentTarget.checked){
          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);

          this.chartSelected.forEach((chart: any) => {
            chart.data=chart.data.filter((c:any) => c.matricule != vehicule.matricule);
          });
        }
      }
    }
    else{
      vehicule.color = (Math.round(Math.random()*255))+','+ (Math.round(Math.random()*255)) +','+ (Math.round(Math.random()*255));
      this.vehiculesSelected.push(vehicule);
      //
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    }
  }

  getInformationsVehicule(vehicule: any, index:any, indexChart:any): any {
    this.ecoconduiteService.historiqueVehicule(vehicule.id, null).subscribe(res => {
      //01
      var _data:any=[];
      if(this.typeFilter=="jour"){
        for (let index = 0; index < 24; index++) {
          var item= {"x":"heur "+(index+1), "y": this.entierAleatoire(1,20) }
          _data.push(item);
        }
      }
      else if(this.typeFilter=="semaine"){
        for (let index = 0; index < 7; index++) {
          var item= {"x":"jour "+(index+1), "y": this.entierAleatoire(1,20) }
          _data.push(item);
        }
      }
      else{
        for (let index = 0; index < 30; index++) {
          var item= {"x":"date "+(index+1), "y": this.entierAleatoire(1,20) }
          _data.push(item);
        }
      }
      
      //02
      this.chartSelected[indexChart-1].data.push({ values:_data , matricule:vehicule.matricule, color:vehicule.color });
      this.createChart(index, _data, vehicule, Math.max(..._data.map((d:any)=> d.y)));
    });
  }
  mChart: any=[];
  createChart(index: any, data: any, vehicule: any, maxValue:any) {
    var chart: any = $('#chart_'+index); 
    if(this.mChart[index])  this.mChart[index].destroy();
    this.mChart[index] = new Chart(chart, {
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

  remplissageChartPrincipale(index: any) {
    if(this.chartSelected[index - 1].data.length>=this.maxVehicule){
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
  }

  entierAleatoire(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  changeData(type:any){
    //01
    this.typeFilter=type; this.viewChartPrincipale=null;
    $('.tchart').removeClass('active'); $('.col-chart').removeClass('border-bottom');
    //02
    this.chartSelected.forEach((chart: any) => {
      delete chart.data; chart.data=[];
    });
    //03
    this.vehiculesSelected.forEach(vehicule => {
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsVehicule(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    });
  }

  checkChart(e: any, index:number){
    //01
    let checkedChart= this.chartSelected.filter((c:any)=> c.checked==true);  this.minChartSelected=checkedChart.length;
    this.chartSelected[(checkedChart[this.minChartSelected-1].index)-1].last=false;
    //02
    if(e.currentTarget.checked){
      if(this.maxChart > this.minChartSelected){
        //console.log("*** this.maxChart >= lengthCheckChart ***");
        this.chartSelected[index-1].checked=true;
      }
      else{
        //console.log("*** this.maxChart >= lengthCheckChart: else ***");
        e.currentTarget.checked=false;
        $('.mc-error').removeClass('d-none');
      }
    }
    else{
      //console.log("*** else ***");
      this.chartSelected[index-1].checked=null;
    }
    //03
    checkedChart= this.chartSelected.filter((c:any)=> c.checked==true);
    this.chartSelected[(checkedChart[checkedChart.length-1].index)-1].last=true;

    //this.chartSelected[(checkedChart[checkedChart.length-1])-1];
    //console.log('** ap **',checkedChart[checkedChart.length-1]);
    //console.log(this.chartSelected, this.chartSelected[(checkedChart[checkedChart.length-1].index)-1]);
  }

}
