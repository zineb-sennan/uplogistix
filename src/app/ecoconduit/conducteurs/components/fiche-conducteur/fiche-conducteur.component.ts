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
  date=new Date(); infosGlobale:any = {scoreGlobal:0, dureeConduite: 0, distanceParcourue:0, nbTrajets:0 }; conducteurs:any = [];
  //typeFilter='jour'; 
  filter: any = { vehicule_id: null, date_debut: this.datepipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datepipe.transform(this.date, 'yyyy-MM-dd'), conducteur:'' };
  dataComportement:any=[];

  constructor(
    private datepipe:DatePipe,
    private geoLocalisationService:GeoLocalisationService,
    private conducteurService: ConducteurService, 
    private ecoconduiteService:EcoconduiteService
  ) { }

  ngOnInit(): void {
    //
    this.getAllConducteurs();
  }


  getAllConducteurs(){
    this.conducteurService.getConducteurs().subscribe(
      res=> {
        this.conducteurs=[...res].filter(c=> c.vehicule_id);
        if(this.conducteurs.length > 0){
          this.filter.conducteur = this.conducteurs[0].prenom +' '+ this.conducteurs[0].nom;
          this.filter.vehicule_id = this.conducteurs[0].vehicule_id;
          this.getResumeConducteur();
        } 
      }
    )
  }

  getResumeConducteur(){
    //01
    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      async res=>{
        this.infosGlobale.distanceParcourue= res.distance.reduce((prev:any,next:any)=>prev+next.distance,0);
        this.infosGlobale.dureeConduite=this.secondsToDhms(res.driveTime.reduce((prev:any,next:any)=>prev+this.toSeconds(next.duree),0));
      }
    )
    //02
    this.ecoconduiteService.historiqueVehicule(this.filter.vehicule_id, {date_debut: this.filter.date_debut+"T00:00:00", date_fin: this.filter.date_fin+"T23:59:59"}).subscribe(
      res=>  this.infosGlobale.nbTrajets = [...res.records].filter(r=> r.genre == "trip").length
    )
    //03
    this.geoLocalisationService.analyseConducteur(this.filter).subscribe(
      res=> {
        this.dataComportement=[];

        this.dataComportement.push({
          x: "Score d'excès de vitesse",
          y: this.claculMoy(res.speedScore)
        })
        this.dataComportement.push({
          x: "Freinage brusque",
          y: this.claculMoy(res.freinage)
        })
        this.dataComportement.push({
          x: "Comportement excessif",
          y: this.claculMoy(res.virrage_serre)
        })
        this.dataComportement.push({
          x: "Accélération brusque",
          y: this.claculMoy(res.acceleration)
        })

        this.infosGlobale.scoreGlobal = (this.dataComportement[0].y+ this.dataComportement[1].y + this.dataComportement[2].y+ this.dataComportement[3].y)/4

        this.charComportement(this.dataComportement);

      }
    )
  }

  changeConducteur(e:any){
    this.filter.conducteur = [...this.conducteurs].filter(c=> c.vehicule_id == e.target.value).map(c=> c.prenom + ' '+ c.nom);
    this.filter.vehicule_id = e.target.value;
  }

  claculMoy(data:any){
    const data_def_0 = [...data].filter(d=> d.score != 0);
    return [...data_def_0].length > 0 ? [...data_def_0].reduce((prev:any,next:any)=>prev+next.score,0) / [...data_def_0].length: 100
  }

  myChart:any=null;
  charComportement(_data:any){
    if (this.myChart) this.myChart.destroy();

    this.myChart= new Chart(<any>$('#chart_test'),{
      type:'radar',
      data:{
        datasets:[
          {
            data: [..._data].map(d=> d.y),
            label:"chart",
            borderColor: 'rgba(44, 123, 228, 0.5)'
          }
        ],
        labels: [..._data].map(d=> d.x)
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
