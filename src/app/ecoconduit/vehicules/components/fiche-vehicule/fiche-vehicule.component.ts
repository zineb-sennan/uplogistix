import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EcoconduiteService } from '../../../../_services/ecoconduite.service';
import { GeoLocalisationService } from '../../../../_services/geolocalisation.service';
import { VehiculeService } from '../../../../_services/vehicule.service';

@Component({
  selector: 'app-fiche-vehicule',
  templateUrl: './fiche-vehicule.component.html',
  styleUrls: ['./fiche-vehicule.component.css']
})
export class FicheVehiculeComponent implements OnInit {
  //
  date=new Date();
  typeFilter='jour';  filter: any = { vehicule_id: 9, matricule:'', date_debut: this.datePipe.transform(this.date, 'yyyy-MM-dd'), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') }; vehicules:any=[];
  infosGlobale:any={ class_energetique:0, distanceParcourue:0,  dureeConduite:0, fuelConsomme:0, consommationMoyenne:0, scoreGlobale:0, emissionCo2:0, empreinteCarbone:0}

  constructor(
    private geoLocalisationService:GeoLocalisationService,
    private ecoconduiteService:EcoconduiteService,
    private vehiculeService:VehiculeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    
    this.getVehicleWithBalise();

    this.changeType('periode');
    this. getResumeVehicule();
  }

  getResumeVehicule(){
    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      async res=>{
        this.infosGlobale.distanceParcourue= res.distance.reduce((prev:any,next:any)=>prev+next.distance,0);
        this.infosGlobale.fuelConsomme= res.fuel.reduce((prev:any,next:any)=>prev+next.qte,0);
        this.infosGlobale.dureeConduite=this.secondsToDhms(res.driveTime.reduce((prev:any,next:any)=>prev+this.toSeconds(next.duree),0));
        this.infosGlobale.consommationMoyenne=res.l100.reduce((prev:any,next:any)=>prev+next.consommation,0)/res.l100.length;
        this.infosGlobale.emissionCo2=res.carbone.reduce((prev:any,next:any)=>prev+next.CO2g,0);
        this.infosGlobale.empreinteCarbone=res.carbone.reduce((prev:any,next:any)=>prev+next.Cg,0);
        this.infosGlobale.scoreGlobale=(await this.ecoconduiteService.scoreByVehicule(this.filter).toPromise()).new_score;
        this.infosGlobale.class_energetique = (this.infosGlobale.emissionCo2*1000)/this.infosGlobale.distanceParcourue;
      }
    )
  }

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

  getVehicleWithBalise(){
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.balise);
        if(this.vehicules.length > 0) { this.filter.vehicule_id=this.vehicules[0].id;  this.filter.matricule=this.vehicules[0].matricule;};
      }
    )
  }

  changeVehicule(e:any){
    this.getVehiculeById(e.target.value);
    this.filter.matricule = [...this.vehicules].filter(v=> v.id == e.target.value)[0].matricule;
  }

  filterFun(){
    this. getResumeVehicule();
  }

  getVehiculeById(id:number){
    this.vehiculeService.getVehiculeById(id).subscribe(
      res=> this.filter.matricule=res.matricule
    );
  }

  changeType(type:any){
    this.typeFilter = type;
    if (type == "jour")  this.filter.date_fin = this.filter.date_debut=this.datePipe.transform(this.date, 'yyyy-MM-dd');
    else {
        this.filter.date_debut = this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd");
        this.filter.date_fin = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      }
  }

}
