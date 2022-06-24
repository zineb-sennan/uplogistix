import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';
import { SecuriteClass } from '../../../../_globale/securite';
import { ConducteurService } from '../../../../_services/conducteur.service';

@Component({
  selector: 'app-comparaison-conducteurs',
  templateUrl: './comparaison-conducteurs.component.html',
  styleUrls: ['./comparaison-conducteurs.component.css']
})
export class ComparaisonConducteursComponent implements OnInit {
  date = new Date();
  filter: any = { vehicule_id: null, date_debut: this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') };
  //
  colors=['56, 95, 158','247, 189, 1', '20, 156, 56', '94, 202, 223'];
  viewChartPrincipale:any=null;  maxConducteur = 2; maxChart=5;
  conducteurs: any[] = []; conducteursSelected: any[] = []; 

  chartSelected: any = [
    { index: 1, libelle: 'Acceleration brusque', slug:'acceleration-brusque', data: [], dates: [] },
    { index: 2, libelle: 'Freinage brusque', slug:'freinage-brusque', data: [], dates: [] },
    { index: 3, libelle: 'Comportement excessif', slug:'comportement-excessif', data: [], dates: [] },
    { index: 4, libelle: 'Temps de conduite', slug:'temps-de-conduite', data: [], dates: [] },
    { index: 5, libelle: 'Score d\'excès de vitesse', slug:'Nbre-exces-vitesse', data: [], dates: [] }
  ];

  constructor(
    private conducteurService: ConducteurService,
    private securiteClass: SecuriteClass,
    private datepipe: DatePipe,
    private geoLocalisationService: GeoLocalisationService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.getConducteurs();
    //
    for (let index = 0; index < this.maxChart; index++) this.chartSelected[index].checked=true;
    this.chartSelected[this.maxChart-1].last=true;
  }

  getConducteurs() {
    this.conducteurService.getAll(1).subscribe(
      res=>{
        this.conducteurs=res['records'];
        for (let index = 0; index < this.maxConducteur; index++) {
          this.checkConducteurs(null,this.conducteurs[index]);
          this.conducteurs[index].checked=true;
        }
      },
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getConducteurs();
      }
    )
  }

  checkConducteurs(e: any, conducteur: any) {
  //01
  this.viewChartPrincipale = null;
  $('.tchart').removeClass('active');
  $('.col-chart').removeClass('border-bottom');
  //02
  if (e != null) {
    if (this.conducteursSelected.length == this.maxConducteur) {
      if (e.currentTarget.checked) {
        e.currentTarget.checked = false;
        $('.mv-error').removeClass("d-none");
      }
      else {
        this.chartSelected.forEach((chart: any) => {
          chart.data = chart.data.filter((c: any) => c.matricule != conducteur.matricule);
        });

        this.conducteursSelected = this.conducteursSelected.filter(v => v.id != conducteur.id);
        $('.mv-error').addClass("d-none");
      }
    }
    else if (this.conducteursSelected.length < this.maxConducteur) {
      if (e.currentTarget.checked) {
        conducteur.color = this.colors.filter(v => !this.conducteursSelected.map((vs: any) => vs.color).includes(v))[0];
        this.conducteursSelected.push(conducteur);
        this.getInformationsConducteur(conducteur);
      }
      else if (!e.currentTarget.checked) {
        this.conducteursSelected = this.conducteursSelected.filter(v => v.id != conducteur.id);

        this.chartSelected.forEach((chart: any) => {
          chart.data = chart.data.filter((c: any) => c.matricule != conducteur.matricule);
        });
      }
    }
  }
  else {
    conducteur.color = this.colors[this.conducteursSelected.length];
    this.conducteursSelected.push(conducteur);
    //
    this.getInformationsConducteur(conducteur);
  }
  }

  getInformationsConducteur(conducteur: any) {
    var _data: any = null;
    this.filter.vehicule_id =  conducteur.vehicule_id;

    this.geoLocalisationService.analyseConducteur(this.filter).subscribe(
      res => {
        this.chartSelected.forEach((chart: any) => {
           //Acceleration brusque
           if (chart.index == 1) _data = [...res.acceleration].map((v: any) => ({ x: v.date, y: v.score }));
           //Freinage brusque
           else if (chart.index == 2) _data = [...res.freinage].map((v: any) => ({ x: v.date, y: v.score }));
           //Comportement excessif
           else if (chart.index == 3) _data = [...res.virrage_serre].map((v: any) => ({ x: v.date, y: v.score }));
           //Temps de conduite
           else if (chart.index == 4) _data = res.driveTime.map((v: any) => ({ x: v.date, y: this.toSeconds(v.time) }));
           //
           else if (chart.index == 5) _data = res.speedScore.map((v: any) => ({ x: v.date, y: v.score }));
           //
           else  _data = [];

          const item = {
            values: _data,
            matricule: conducteur.nom, 
            color: conducteur.color
          };
          this.chartSelected[chart.index - 1].data.push(item);
          this.createChart((conducteur.id + '' + chart.index), _data, conducteur, Math.max(..._data.map((d: any) => d.y)), chart.index);
        });//fin forEach
      }
    )//fin geoLocalisation
  }

  formateDate(date: number) {
    return this.datepipe.transform(date, 'dd-MM-yyyy')?.toString()
  }

  myChart: any = [];
  createChart(index: any, _data: any, vehicule: any, maxValue: any, indexChart: Number) {
    if (this.myChart[index]) this.myChart[index].destroy();

    const _myChart: any = {
      type: 'line',
      data: {
        datasets: [{
          data: _data,
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
          borderWidth: 1.5
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
    };

    //temps de conduite par date 
    if (indexChart == 4) $('#max_' + index).text(this.secondsToDhms(maxValue));
  
    else{
      if (maxValue != '-Infinity' && !isNaN(maxValue)) $('#max_' + index).text(maxValue.toFixed(2));
    }

    this.myChart[index] = new Chart(<any>$('#chart_conducteur_' + index), _myChart);
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

  traiterData(data:any, dates:any){
    [...dates].forEach(date => {
      if([...data].filter(dt=> dt.x== date).length==0){
        data.push({x:date, y:0})
      }
    });

    data = [...data].sort((a, b) => (new Date(a.x).getTime()) / 1000 - (new Date(b.x).getTime()) / 1000);
    return [...data].map(d=> ({ x: this.formateDate(d.x), y: d.y}) );
    
  }

  createChartPrincipale(infosChart: any) {
    //01
    var chart: any = $('#chart-principal');
    if (this.myChart[-1]) this.myChart[-1].destroy();
    var _infosChart: any = {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { drawOnChartArea: false }
          },
          y: {
            grid: { drawOnChartArea: false }
          }
        }
      }
    }

    //
    let dates:any=[];
    infosChart.data.forEach((chart: any) => { 
      [...chart.values].forEach(val => {
        if([...dates].filter(d => d== val.x).length==0) dates.push(val.x)
      });
     })
    //
    infosChart.data.forEach((chart: any) => {
       var item = { data: this.traiterData(chart.values, dates), label: chart.matricule, borderColor: 'rgba(' + chart.color + ',1)' };
       _infosChart.data.datasets.push(item);
     })

    //03 Temps de conduite 
    if (infosChart.index == 4) {
      _infosChart.options={
        maintainAspectRatio:false,
        scales:{
          x:{ grid:{ drawOnChartArea:false } },
          y: {
            grid:{ drawOnChartArea:false },
            ticks: {
              callback: function (_seconds: any){
                var hours = Math.floor(_seconds / 3600),
                minutes = Math.floor((_seconds % 3600) / 60),
                seconds = Math.floor(_seconds % 60);
  
                return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'); 
              }//;
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context:any):any {
                var hours = Math.floor(context.parsed.y / 3600),
                minutes = Math.floor((context.parsed.y % 3600) / 60),
                seconds = Math.floor(context.parsed.y % 60);
                return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'); 
              }
            }
          }
      }
    }
    }

    //04
    this.myChart[-1] = new Chart(chart, _infosChart);
  }

  changeData(){
    //01
    $('.tchart').removeClass('active'); $('.col-chart').removeClass('border-bottom');
    //02
    this.chartSelected.forEach((chart: any) => {
      delete chart.data; chart.data=[];
    });
    //03
    this.conducteursSelected.forEach(conducteur => {
        this.getInformationsConducteur(conducteur);
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

  secondsToDhms(_seconds:number) {
    var hours = Math.floor(_seconds / 3600),
    minutes = Math.floor((_seconds % 3600) / 60),
    seconds = Math.floor(_seconds % 60);

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'); 
  }

  toSeconds(str: string) {
    var res = str.split(':');
    return (+res[0]) * 3600 + (+res[1]) * 60 + (+res[2]);
  }


}
