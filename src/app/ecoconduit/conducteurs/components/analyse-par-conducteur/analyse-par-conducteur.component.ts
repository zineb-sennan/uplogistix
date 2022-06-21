import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';

@Component({
  selector: 'app-analyse-par-conducteur',
  templateUrl: './analyse-par-conducteur.component.html',
  styleUrls: ['./analyse-par-conducteur.component.css']
})
export class AnalyseParConducteurComponent implements OnInit {
  //
  date=new Date(); conducteurs:any=[];
  typeFilter='jour'; filter: any = { vehicule_id: null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') };

  constructor(
    private datepipe: DatePipe,
    private geoLocalisationService:GeoLocalisationService,
    private conducteurService:ConducteurService
  ) { }

  ngOnInit(): void {
     //01-
     Chart.register(...registerables);
     //02-
     //this.chartScore();
     this.filterData();
     this.getConducteurs();
     //this.genererGraphe("Vitesse maximale");
  }

  getConducteurs(){
    this.conducteurService.getAll(1).subscribe(
      res=> this.conducteurs= [...res.records].filter(c=> c.vehicule_id) 
    )
  }


  
  changeConducteur(e:any){
    this.filter.vehicule_id = e.target.value;
    this.filterData();
  }

  myChart:any = [];
  genererGraphe(idChart:any,  _data:any, indexChart:number){ 
    if (this.myChart[indexChart]) this.myChart[indexChart].destroy();
     
    const _myChar:any = {
      type:'line',
      data:{
        datasets:[
          {
            data: _data,
            backgroundColor: 'rgb(44, 123, 228)',
            //borderColor: 'rgb(44, 123, 228)'
          }
        ],
      },
      options:{
        maintainAspectRatio:false,
        scales:{
          x:{ grid:{ drawOnChartArea:false } },
          y:{ grid:{ drawOnChartArea:false } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    };

    if(this.filter.typeFilter=='driveTime') {
      _myChar.options={
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
    }// fin if
    
    this.myChart[indexChart] = new Chart(<any>$('#' + idChart), _myChar);
  } // ./genererGraphe

  // chartScore(){
  //   let chart:any=$('#chart_score');
  //   new Chart(chart,{
  //     type:'line',
  //     data:{
  //       datasets:[
  //         {
  //           data: [0, 0, 0, 0, 0, 0],
  //           label:"chart",
  //           pointBackgroundColor: 'rgb(44, 123, 228)',
  //           pointHoverBackgroundColor: 'rgb(44, 123, 228)',
  //           pointBorderWidth: 10,
  //           borderWidth: 3
  //         }
  //       ],
  //       labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  //     },
  //     options:{
  //       maintainAspectRatio:false,
  //       scales:{
  //         x:{
  //           grid:{ drawOnChartArea:false }
  //         },
  //         y:{
  //             grid:{ drawOnChartArea:false }
  //           }
  //       },
  //       plugins: {
  //         legend: { display: false }
  //       }
  //     },
  //   })
  // }// ./ fun chartScore

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      }
  }

  /* *** *** *** *** */
  filterData(){
    console.log('*f*',this.filter)

    this.geoLocalisationService.analyseConducteur(this.filter).subscribe(
      res => {
        var _data=null;
        //console.log(res,'uuu');
        if(this.filter.typeFilter=='acceleration' || this.filter.typeFilter=='freinage' || this.filter.typeFilter=='virrage_serre') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date), y: v.score }));
        // else if(this.filter.typeFilter=='fuel') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.montant_carburant) }));
        // else if(this.filter.typeFilter=='distance') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure) , y: v.distance }));
        // else if(this.filter.typeFilter=='carbone') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.CO2g) }));
        // else if(this.filter.typeFilter=='driveTime') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: this.toSeconds(v.duree) , z: v.duree }));
        // else if(this.filter.typeFilter=='l100') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.consommation) }));
        //
        // this.genererGraphe('chart_vehicule', _data,1)
        // if(this.filter.typeFilter=='driveTime') $('#maxVal').text( this.secondsToDhms(Math.max(..._data.map((d: any) => d.y))) )
        // else $('#maxVal').text( (Math.max(..._data.map((d: any) => d.y))).toFixed(2) )

        //console.log('ff',_data);

        console.log(_data);
      }
    )
  }

  /*** *** *** *** ** */
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

  formateDate(data:number){
    if(this.typeFilter=='jour') return data.toString().padStart(2, '0')+':00'
    return this.datepipe.transform(data,'dd-MM-yyyy')
  }

}
