import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables, Scale } from 'chart.js';
import * as $ from 'jquery';
import { EcoconduiteService } from '../../../../_services/ecoconduite.service';
import { GeoLocalisationService } from '../../../../_services/geolocalisation.service';
import { VehiculeService } from '../../../../_services/vehicule.service';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-analyse-par-vehicule',
  templateUrl: './analyse-par-vehicule.component.html',
  styleUrls: ['./analyse-par-vehicule.component.css']
})
export class AnalyseParVehiculeComponent implements OnInit {
  //
  date=new Date()
  typeFilter='jour';  
  filter: any = { vehicule_id: null, matricule:null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd'), typeFilter:'maxSpeed' }
  vehicules:any=[]; score:any={maximale:'', minimal:''}

  constructor(
    private geoLocalisationService:GeoLocalisationService,
    private vehiculeService:VehiculeService,
    private datepipe: DatePipe,
    private ecoconduiteService:EcoconduiteService
  ) { }

  async ngOnInit() {
    //01-
    Chart.register(...registerables);
    //02-liste des vehicules avec eco-conduite
    this.vehicules = (await this.vehiculeService.getAll().toPromise()).filter((v: any) => v.eco_conduite);
    if(this.vehicules.length > 0) { this.filter.vehicule_id=this.vehicules[0].id;  this.filter.matricule=this.vehicules[0].matricule;};
    //03- remplissage des données
    this.getEvolutionScore();
    //
    this.changeType('periode');
    this.filterData();
  }
  

  changeVehicule(e:any){
    this.filter.vehicule_id = e.target.value;
    this.filter.matricule = [...this.vehicules].filter(v=> v.id == e.target.value)[0].matricule;
    this.getEvolutionScore();
    this.filterData();
  }

  filterData(){
    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      res => {
        var _data=null;
        if(this.filter.typeFilter=='maxSpeed' || this.filter.typeFilter=='speedAverage') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: v.average }));
        else if(this.filter.typeFilter=='fuel') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.montant_carburant) }));
        else if(this.filter.typeFilter=='distance') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure) , y: v.distance }));
        else if(this.filter.typeFilter=='carbone') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.CO2g) }));
        else if(this.filter.typeFilter=='driveTime') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: this.toSeconds(v.duree) , z: v.duree }));
        else if(this.filter.typeFilter=='l100') _data=res[this.filter.typeFilter].map((v: any) => ({ x: this.formateDate(v.date_heure), y: Number(v.consommation) }));
        //
        this.genererGraphe('chart_vehicule', _data,1)
        if(this.filter.typeFilter=='driveTime') $('#maxVal').text( this.secondsToDhms(Math.max(..._data.map((d: any) => d.y))) )
        else $('#maxVal').text( (Math.max(..._data.map((d: any) => d.y))).toFixed(2) )
      }
    )
  }

  formateDate(data:number){
    if(this.typeFilter=='jour') return data.toString().padStart(2, '0')+':00'
    return this.datepipe.transform(data,'dd/MM')
  }
  
  getEvolutionScore(){
    const record = { vehicule_id: this.filter.vehicule_id, date_debut: this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') }
    this.ecoconduiteService.evolutionScoreByVehicule(record).subscribe(
      res =>{
        this.genererGraphe('chart_score',res.map((v:any)=> ({ x:this.datepipe.transform(v.date_operation, 'dd/MM'), y: Number(v.score) })),0);
        this.score.maximale = Math.max(...res.map((d: any) => d.score));
        this.score.minimal = Math.min(...res.map((d: any) => d.score));
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

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      }
  }

}
