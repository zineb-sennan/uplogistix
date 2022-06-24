import { Component, OnInit } from '@angular/core';
import { GeoLocalisationService } from '../../../../_services/geolocalisation.service';
import { VehiculeService } from '../../../../_services/vehicule.service';
import { SecuriteClass } from '../../../../_globale/securite';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-comparaison-vehicule',
  templateUrl: './comparaison-vehicule.component.html',
  styleUrls: ['./comparaison-vehicule.component.css']
})
export class ComparaisonVehiculeComponent implements OnInit {
  //
  date: any = new Date();
  typeFilter = 'periode'; filter: any = { vehicule_id: null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') };
  colors = ['56, 95, 158', '247, 189, 1', '20, 156, 56', '94, 202, 223'];
  viewChartPrincipale: any = null; maxVehicule = 2; maxChart = 5;
  vehicules: any[] = []; vehiculesSelected: any[] = [];
  chartSelected: any = [
    { index: 1, libelle: 'Vitesse maximale Km', slug: 'vitesse-moyenne', data: [] },
    { index: 2, libelle: 'Vitesse moyenne Km', slug: 'vitesse-moyenne', data: [] },
    { index: 3, libelle: 'Consommation carburant', slug: 'vitesse-moyenne', data: [] },
    { index: 4, libelle: 'Distance parcourue Km', slug: 'distance-parcourue', data: [] },
    { index: 5, libelle: 'Emission CO2 kg', slug: 'emission-co2', data: [] },
    { index: 6, libelle: 'Temps de conduite', slug: 'temps-conduite', data: [] },
    { index: 7, libelle: 'Consommation l/100km', slug: 'Consommation-l-100km', data: [] }
  ];

  constructor(
    private vehiculeService: VehiculeService,
    private securiteClass: SecuriteClass,
    private geoLocalisationService: GeoLocalisationService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.getVehiculeWitheEco();
    //
    for (let index = 0; index < this.maxChart; index++) this.chartSelected[index].checked=true;
    this.chartSelected[this.maxChart-1].last=true;
    //
    this.changeType('periode');
  }

  getVehiculeWitheEco() {
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.eco_conduite);
        for (let index = 0; index < this.maxVehicule; index++) {
          this.checkVehicules(null, this.vehicules[index]);
          this.vehicules[index].checked = true;
        }
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getVehiculeWitheEco();
      }
    )
  }

  checkVehicules(e: any, vehicule: any) {
    //01
    this.viewChartPrincipale = null;
    $('.tchart').removeClass('active');
    $('.col-chart').removeClass('border-bottom');
    //02
    if (e != null) {
      if (this.vehiculesSelected.length == this.maxVehicule) {
        if (e.currentTarget.checked) {
          e.currentTarget.checked = false;
          $('.mv-error').removeClass("d-none");
        }
        else {
          this.chartSelected.forEach((chart: any) => {
            chart.data = chart.data.filter((c: any) => c.matricule != vehicule.matricule);
          });

          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);
          $('.mv-error').addClass("d-none");
        }
      }
      else if (this.vehiculesSelected.length < this.maxVehicule) {
        if (e.currentTarget.checked) {
          vehicule.color = this.colors.filter(v => !this.vehiculesSelected.map((vs: any) => vs.color).includes(v))[0];
          this.vehiculesSelected.push(vehicule);
          this.getInformationsVehicule(vehicule);
        }
        else if (!e.currentTarget.checked) {
          this.vehiculesSelected = this.vehiculesSelected.filter(v => v.id != vehicule.id);

          this.chartSelected.forEach((chart: any) => {
            chart.data = chart.data.filter((c: any) => c.matricule != vehicule.matricule);
          });
        }
      }
    }
    else {
      vehicule.color = this.colors[this.vehiculesSelected.length];
      this.vehiculesSelected.push(vehicule);
      //
      this.getInformationsVehicule(vehicule);
    }
  }

  getInformationsVehicule(vehicule: any) {
    var _data: any = null;
    this.filter.vehicule_id = vehicule.id;

    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      res => {
        this.chartSelected.forEach((chart: any) => {
          //MaxSpeed | Vitesse maximale Km
          if (chart.index == 1) _data = res.maxSpeed.map((v: any) => ({ x: v.date_heure.toString(), y: v.average }));
          //SpeedAverage| Vitesse moyenne Km
          else if (chart.index == 2) _data = res.speedAverage.map((v: any) => ({ x: v.date_heure.toString(), y: v.average }));
          //Fuel | Consommation carburant
          else if (chart.index == 3) _data = res.fuel.map((v: any) => ({ x: v.date_heure.toString(), y: Number(v.montant_carburant) }));
          //Distance | Distance parcourue Km
          else if (chart.index == 4) _data = res.distance.map((v: any) => ({ x: v.date_heure.toString(), y: v.distance }));
          //carbone | Emission CO2 kg
          else if (chart.index == 5) _data = res.carbone.map((v: any) => ({ x: v.date_heure.toString(), y: Number(v.CO2g) }));
          //DriveTime | Temps de conduite
          else if (chart.index == 6) _data = res.driveTime.map((v: any) => ({ x: v.date_heure.toString(), y: this.toSeconds(v.duree) }));
          //L100 | Consommation l/100km
          else if (chart.index == 7) _data = res.l100.map((v: any) => ({ x: v.date_heure.toString(), y: Number(v.consommation) }));
          //
          const item = {
            values: _data, 
            matricule: vehicule.matricule, 
            color: vehicule.color
          };

          //console.log(_data);
          this.chartSelected[chart.index - 1].data.push(item);
          this.createChart((vehicule.id + '' + chart.index), _data, vehicule, Math.max(..._data.map((d: any) => d.y)), chart.index);
        });//fin forEach
      }
    )//fin geoLocalisation
  }

  formateDate(date: number) {
    if (this.typeFilter == 'jour') return date.toString().padStart(2, '0') + ':00'
    return this.datepipe.transform(date, 'dd-MM-yyyy')
  }

  myChart: any = [];
  createChart(index: any, _data: any, vehicule: any, maxValue: any, indexChart: Number) {
    ///console.log(''index);


    if (this.myChart[index]) this.myChart[index].destroy();

    //
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

    this.myChart[index] = new Chart(<any>$('#chart_' + index), _myChart);

    //temps de conduite par date 
    if (indexChart == 6) $('#max_' + index).text(this.secondsToDhms(maxValue));
    else{
      if (maxValue != '-Infinity' && !isNaN(maxValue)) $('#max_' + index).text(maxValue.toFixed(2));
    }

    
  }

  remplissageChartPrincipale(index: any) {
    if (this.chartSelected[index - 1].data.length >= this.maxVehicule) {
      this.viewChartPrincipale = true;
      $('.tchart').removeClass('active'); $('.chart-' + index).addClass('active');
      $('.col-chart').removeClass('border-bottom'); $('.col-chart-' + index).addClass('border-bottom');
      this.createChartPrincipale(this.chartSelected[index - 1]);
    }
    else
      this.viewChartPrincipale = false;
  }

  traiterData(data:any, dates:any){
    [...dates].forEach(date => {
      if([...data].filter(dt=> dt.x== date).length==0){
        data.push({x:date, y:0})
      }
    });

    if(this.typeFilter=='jour')
      data = [...data].sort((a, b) => Number(a.x) - Number(b.x));
    else
      data = [...data].sort((a, b) => (new Date(a.x).getTime()) / 1000 - (new Date(b.x).getTime()) / 1000);

    return [...data].map(d=> ({ x: this.formateDate(d.x), y: d.y}) );
    
  }

  //myChart:any = [];
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
    //02
    // infosChart.data = [...infosChart.data].sort((a, b) => (new Date(a.dateDebut).getTime()) / 1000 - (new Date(b.dateDebut).getTime()) / 1000);

    // infosChart.data.forEach((chart: any) => {
    //   var item = { data: chart.values, label: chart.matricule, borderColor: 'rgba(' + chart.color + ',1)' };
    //   _infosChart.data.datasets.push(item);
    // })
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
    if (infosChart.index == 6) {
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

  changeData(type: any) {
    if (type == "jour") this.filter.date_fin = this.filter.date_debut;
    //01
    this.typeFilter = type; this.viewChartPrincipale = null;
    $('.tchart').removeClass('active'); $('.col-chart').removeClass('border-bottom');
    //02
    this.chartSelected.forEach((chart: any) => {
      delete chart.data; chart.data = [];
    });
    //03
    this.vehiculesSelected.forEach(vehicule => {
      this.getInformationsVehicule(vehicule);
    });
  }

  checkChart(e: any, index: number) {
    //01
    this.viewChartPrincipale = null;
    $('.tchart').removeClass('active');
    $('.col-chart').removeClass('border-bottom');
    //02
    let checkedChart = this.chartSelected.filter((c: any) => c.checked == true);
    this.chartSelected[(checkedChart[checkedChart.length - 1].index) - 1].last = false;
    //03
    if (e.currentTarget.checked) {
      if (this.maxChart > checkedChart.length) this.chartSelected[index - 1].checked = true;
      else {
        e.currentTarget.checked = false;
        $('.mc-error').removeClass('d-none');
      }
    }
    else {
      if (checkedChart.length == 1) e.currentTarget.checked = true;
      else this.chartSelected[index - 1].checked = null;
    }
    //04
    checkedChart = this.chartSelected.filter((c: any) => c.checked == true);
    this.chartSelected[(checkedChart[checkedChart.length - 1].index) - 1].last = true;
  }

  entierAleatoire(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toSeconds(str: string) {
    var res = str.split(':');
    return (+res[0]) * 3600 + (+res[1]) * 60 + (+res[2]);
  }

  secondsToDhms(_seconds:number) {
    var hours = Math.floor(_seconds / 3600),
    minutes = Math.floor((_seconds % 3600) / 60),
    seconds = Math.floor(_seconds % 60);

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'); 
  }

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      }
  }
  

}
