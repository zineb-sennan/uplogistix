import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';

@Component({
  selector: 'app-comparaison-conducteurs',
  templateUrl: './comparaison-conducteurs.component.html',
  styleUrls: ['./comparaison-conducteurs.component.css']
})
export class ComparaisonConducteursComponent implements OnInit {
  //
  colors=['56, 95, 158','247, 189, 1', '20, 156, 56', '94, 202, 223'];
  viewChartPrincipale:any=null; typeFilter='jour'; maxConducteur = 4; maxChart=4;
  conducteurs: any[] = []; conducteursSelected: any[] = []; 
  chartSelected: any = [
    { index: 1, checked:true, libelle: 'Acceleration brusque', slug:'acceleration-brusque', data: [] },
    { index: 2, checked:true, libelle: 'Freinage brusque', slug:'freinage-brusque', data: [] },
    { index: 3, checked:true, libelle: 'Comportement excessif', slug:'comportement-excessif', data: [] },
    { index: 4, checked:true, libelle: 'Temps de conduite', slug:'temps-de-conduite', data: [], last:true },
    { index: 5, libelle: 'Conduite dangereuse/100km', slug:'conduite-dangereuse', data: [] },
    { index: 6, libelle: 'Nbre des excès de vitesse', slug:'Nbre-exces-vitesse', data: [] },
    { index: 7, libelle: 'Emission CO2', slug:'emission-co2', data: [] }
  ];

  constructor(
    private conducteurService: ConducteurService,
    private ecoconduiteService: EcoconduiteService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.getConducteurs();
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

  checkConducteurs(e: any, conducteur: any) {
   //01
    this.viewChartPrincipale=null;
    $('.tchart').removeClass('active'); 
    $('.col-chart').removeClass('border-bottom');
    //02
    if(e!=null){
      if (this.conducteursSelected.length == this.maxConducteur) {
        if (e.currentTarget.checked) {
          e.currentTarget.checked = false;
          $('.mv-error').removeClass("d-none");
        }
        else {
          this.chartSelected.forEach((chart: any) => {
            chart.data=chart.data.filter((c:any) => c.matricule != conducteur.matricule);
          });
  
          this.conducteursSelected = this.conducteursSelected.filter(v => v.id != conducteur.id);
          $('.mv-error').addClass("d-none");
        }
      }
      else if (this.conducteursSelected.length < this.maxConducteur) {
        if (e.currentTarget.checked){
          conducteur.color=this.colors.filter(v => !this.conducteursSelected.map((vs:any) => vs.color ).includes(v))[0];
          this.conducteursSelected.push(conducteur);

          this.chartSelected.forEach((chart: any) => {
            this.getInformationsConducteur(conducteur, (conducteur.id + '' + chart.index), chart.index);
          });
        }
        else if(!e.currentTarget.checked){
          this.conducteursSelected = this.conducteursSelected.filter(v => v.id != conducteur.id);

          this.chartSelected.forEach((chart: any) => {
            chart.data=chart.data.filter((c:any) => c.matricule != conducteur.matricule);
          });
        }
      }
    }
    else{
      conducteur.color = this.colors[this.conducteursSelected.length];
      this.conducteursSelected.push(conducteur);
      //
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsConducteur(conducteur, (conducteur.id + '' + chart.index), chart.index);
      });
    }
  }

  getInformationsConducteur(conducteur: any, index:any, indexChart:any): any {
    this.ecoconduiteService.historiqueVehicule(conducteur.id, null).subscribe(res => {
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
      this.chartSelected[indexChart-1].data.push({ values:_data, nom_complet:conducteur.nom+' '+conducteur.prenom, color:conducteur.color });
      this.createChart(index, _data, conducteur, Math.max(..._data.map((d:any)=> d.y)));
    });
  }

  mChart: any=[];
  createChart(index: any, data: any, conducteur: any, maxValue:any) {
    var chart: any = $('#chart_conducteur_'+index); 
    if(this.mChart[index])  this.mChart[index].destroy();
    this.mChart[index] = new Chart(chart, {
      type: 'line',
      data: {
        datasets: [{
          data: data,
          borderColor: 'rgb(' + conducteur.color + ')',
          fill: {
            target: 'origin',
            above: 'rgba(' + conducteur.color + ',0.2)',
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
        maintainAspectRatio:false,
        scales:{
          x:{
            grid:{ drawOnChartArea:false }
          },
          y:{
              grid:{ drawOnChartArea:false }
          }
        }
      }
    }
    //02
    infosChart.data.forEach((chart:any) => {
      var item={ data: chart.values, label: chart.nom_complet, borderColor: 'rgba(' + chart.color + ',1)' };
      _infosChart.data.datasets.push(item);
    })
    //03
    this.myChart = new Chart(chart, _infosChart);
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
    this.conducteursSelected.forEach(vehicule => {
      this.chartSelected.forEach((chart: any) => {
        this.getInformationsConducteur(vehicule, (vehicule.id + '' + chart.index), chart.index);
      });
    });
  }


  checkChart(e: any, index:number){
    //01
    this.viewChartPrincipale=null;
    $('.tchart').removeClass('active'); 
    $('.col-chart').removeClass('border-bottom');
    //02
    let checkedChart= this.chartSelected.filter((c:any)=> c.checked==true);
    this.chartSelected[(checkedChart[checkedChart.length-1].index)-1].last=false;
    //03
    if(e.currentTarget.checked){
      if(this.maxChart > checkedChart.length) this.chartSelected[index-1].checked=true;
      else{
        e.currentTarget.checked=false;
        $('.mc-error').removeClass('d-none');
      }
    }
    else{
      if(checkedChart.length==1) e.currentTarget.checked=true;
      else this.chartSelected[index-1].checked=null;
    }
    //04
    checkedChart= this.chartSelected.filter((c:any)=> c.checked==true);
    this.chartSelected[(checkedChart[checkedChart.length-1].index)-1].last=true;
  }
  
  entierAleatoire(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
