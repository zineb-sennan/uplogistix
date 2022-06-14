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
  typeFilter='jour';  filter: any = { vehicule_id: 9, matricule:'11111-H-1', date_debut: "2022-03-10", date_fin: "2022-06-10" }; vehicules:any=[];
  infosGlobale:any={ distanceParcourue:0,  dureeConduite:0, fuelConsomme:0, consommationMoyenne:0, scoreGlobale:0, emissionCo2:0, empreinteCarbone:0}

  constructor(
    private geoLocalisationService:GeoLocalisationService,
    private ecoconduiteService:EcoconduiteService,
    private vehiculeService:VehiculeService
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.getVehicleWithBalise();
  }

   getInfo(){
    this.geoLocalisationService.getAnalyseVehicule(this.filter).subscribe(
      async res=>{
        this.infosGlobale.distanceParcourue= res.distance.reduce((prev:any,next:any)=>prev+next.distance,0);
        this.infosGlobale.fuelConsomme= res.fuel.reduce((prev:any,next:any)=>prev+next.montant_carburant,0);
        this.infosGlobale.dureeConduite=this.secondsToDhms(res.driveTime.reduce((prev:any,next:any)=>prev+this.toSeconds(next.duree),0));
        this.infosGlobale.consommationMoyenne=res.l100.reduce((prev:any,next:any)=>prev+next.consommation,0)/res.l100.length;
        this.infosGlobale.emissionCo2=res.carbone.reduce((prev:any,next:any)=>prev+next.CO2g,0);
        this.infosGlobale.empreinteCarbone=res.carbone.reduce((prev:any,next:any)=>prev+next.Cg,0);
        this.infosGlobale.scoreGlobale=(await this.ecoconduiteService.scoreByVehicule(this.filter).toPromise()).new_score;
      }
    )
  }

  toSeconds(str:string) {
    var res = str.split(':');
    return (+res[0])* 3600 + (+res[1])* 60 + (+res[2]);  
  }

  secondsToDhms(seconds:number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " jour " : " jours ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  getVehicleWithBalise(){
    this.vehiculeService.getAll().subscribe(
      res => {
        this.vehicules = res.filter((v: any) => v.balise);
      }
    )
  }

  changeVehicule(e:any){
     this.getVehiculeById(e.target.value);
  }

  filterFun(){
    // this.getVehiculeById(this.filter.vehicule_id);
    //[this.vehicules].filter(v=>v.id=this.filter.vehicule_id);
    console.log('filter',this.filter)
    //console.log("Bonjour !!!!");
  }

  getVehiculeById(id:number){
    this.vehiculeService.getVehiculeById(id).subscribe(
      res=> this.filter.matricule=res.matricule
    );
  }

}
