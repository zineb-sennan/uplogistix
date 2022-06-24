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
  //typeFilter='jour'; 
  filter: any = { vehicule_id: null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd'), typeFilter: 'acceleration', conducteur:'' };
  score:any={maximale:'', minimal:''}

  constructor(
    private datepipe: DatePipe,
    private geoLocalisationService:GeoLocalisationService,
    private conducteurService:ConducteurService
  ) { }

  ngOnInit(): void {
      this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
      this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
     //01-
     Chart.register(...registerables);
     //02-
     this.getConducteurs();
  }

  getConducteurs(){
    this.conducteurService.getAll(1).subscribe(
      res=>{
        this.conducteurs= [...res.records].filter(c=> c.vehicule_id);
        //
        if(this.conducteurs.length > 0){
          this.filter.vehicule_id = this.conducteurs[0].vehicule_id;
          this.filter.conducteur = this.conducteurs[0].prenom +' '+ this.conducteurs[0].nom;
          this.getEvolutionScore();
          this.filterData();
        } 
      }  
    )
  }

  changeConducteur(e:any){
    //
    this.filter.conducteur = [...this.conducteurs].filter(c=> c.vehicule_id == e.target.value).map(c=> c.prenom + ' '+ c.nom);
    this.filter.vehicule_id = e.target.value;
    //
    this.filterData();
    this.getEvolutionScore();
  }

  filterData(){
    this.geoLocalisationService.analyseConducteur(this.filter).subscribe(
      res => {
        var _data=null;
        if(this.filter.typeFilter=='acceleration' || this.filter.typeFilter=='freinage' || this.filter.typeFilter=='virrage_serre' || this.filter.typeFilter=='speedScore') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date), y: v.score }));
        else if(this.filter.typeFilter=='driveTime') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date), y: this.toSeconds(v.time) , z: v.time }));

        this.genererGraphe('chart_conducteur', _data,1);
        $('#maxVal').text( (Math.max(..._data.map((d: any) => d.y))).toFixed(2) )

      }
    )
  }

  getEvolutionScore(){
    const record = { vehicule_id: this.filter.vehicule_id, date_debut: this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') }
    this.geoLocalisationService.analyseConducteur(record).subscribe(
      res =>{
        this.genererGraphe('chart_score', res.score.map((v: any) => ({ x: this.datepipe.transform(v.date,'dd/MM') , y: v.score })),0);
        this.score.maximale = Math.max(...res.score.map((d:any) => d.score)).toFixed(2);
        this.score.minimal = Math.min(...res.score.map((d:any) => d.score)).toFixed(2);
      } 
    )
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

    if(this.filter.typeFilter == 'driveTime') {
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
    return this.datepipe.transform(data,'dd-MM-yyyy')
  }

}
