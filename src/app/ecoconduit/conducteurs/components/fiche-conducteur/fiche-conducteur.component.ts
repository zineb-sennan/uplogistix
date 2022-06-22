import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from 'jquery';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { EcoconduiteService } from 'src/app/_services/ecoconduite.service';
import { GeoLocalisationService } from 'src/app/_services/geolocalisation.service';

@Component({
  selector: 'app-fiche-conducteur',
  templateUrl: './fiche-conducteur.component.html',
  styleUrls: ['./fiche-conducteur.component.css']
})
export class FicheConducteurComponent implements OnInit {
  //
  date=new Date(); infosGlobale:any = { dureeConduite: 0, distanceParcourue:0, nbTrajets:0 }; conducteurs:any = [];
  typeFilter='jour'; filter: any = { vehicule_id: null, date_debut: this.datepipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd') };
  
  constructor(
    private datepipe:DatePipe,
    private geoLocalisationService:GeoLocalisationService,
    private conducteurService: ConducteurService, 
    private ecoconduiteService:EcoconduiteService
  ) { }

  ngOnInit(): void {
    this.charTest();

    //
    this.getAllConducteurs();

  }


  getAllConducteurs(){
    this.conducteurService.getConducteurs().subscribe(
      res=> {
        this.conducteurs=[...res].filter(c=> c.vehicule_id);
        if(this.conducteurs.length > 0){
          this.filter.vehicule_id = this.conducteurs[0].vehicule_id;
          this.getResumeVehicule();
        } 
      }
    )
  }

  getResumeVehicule(){
    console.log(this.filter);
    //01
    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      async res=>{
        this.infosGlobale.distanceParcourue= res.distance.reduce((prev:any,next:any)=>prev+next.distance,0);
        this.infosGlobale.dureeConduite=this.secondsToDhms(res.driveTime.reduce((prev:any,next:any)=>prev+this.toSeconds(next.duree),0));
      }
    )
    //02

    this.ecoconduiteService.historiqueVehicule(9, {date_debut: this.filter.date_debut+"T00:00:00", date_fin: this.filter.date_fin+"T23:59:59"}).subscribe(
      res=>  this.infosGlobale.nbTrajets = [...res.records].filter(r=> r.genre == "trip").length
    )
  }

  charTest(){
    let chart:any=$('#chart_test');
    new Chart(chart,{
      type:'radar',
      data:{
        datasets:[
          {
            data:[ 100, 80, 50, 100 ],
            label:"chart",
            //backgroundColor: 'rgb(44, 123, 228)',
            borderColor: 'rgba(44, 123, 228, 0.5)'
          }
        ],
        labels:["Score consommation", "Freinage brusque", "Comportement excessif", "Accélération brusque"]
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
        },
        plugins: {
          legend: { display: false }
        }
      },
    })
  }

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      }
  }


  /*** *** ** ** */
  toSeconds(str:string) {
    var res = str.split(':');
    return (+res[0])* 3600 + (+res[1])* 60 + (+res[2]);  
  }

  secondsToDhms(_seconds:number) {  
    var hours = Math.floor(_seconds / 3600),
    minutes = Math.floor((_seconds % 3600) / 60),
    seconds = Math.floor(_seconds % 60);

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'); 
  }

}
