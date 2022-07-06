import { Component, OnInit } from '@angular/core';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { OrdreInterventionService } from 'src/app/_services/ordre-intervention.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

@Component({
  selector: 'app-index-ordre-intervention',
  templateUrl: './index-ordre-intervention.component.html',
  styleUrls: ['./index-ordre-intervention.component.css']
})
export class IndexOrdreInterventionComponent implements OnInit {
  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[]; 
  affecter_a:any="conducteur";
  singleOrder:any={ vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:null, date_limite:null, note:null }

  constructor(
    private ordreInterventionService:OrdreInterventionService,
    private vehiculeService:VehiculeService,
    private conducteurService:ConducteurService,
    private utilisateurService:UtilisateurService
  ) { }

  ngOnInit(): void {
    this.getAllOrdres();
    this.getAllVehicules();
    this.getAllConducteurs();
    this.getAllUtilisateurs();
  }

  getAllOrdres(){
    this.ordreInterventionService.getAll().subscribe(
      res=> this.ordres=res
    )
  }

  getAllVehicules(){
    this.vehiculeService.getAll().subscribe(
      res=> this.vehicules=res
    )
  }

  getAllConducteurs(){
    this.conducteurService.getConducteurs().subscribe(
      res=> {
        this.conducteurs=res;
        console.log('conducteurs', res);
      }
    )
  }

  getAllUtilisateurs(){
    this.utilisateurService.getAll().subscribe(
      res=> {
        this.utilisateurs=res;
        console.log('utilisateur', res);
      } 
    )
  }

}
