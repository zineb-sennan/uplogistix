import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { OrdreInterventionService } from 'src/app/_services/ordre-intervention.service';
import { TachesService } from 'src/app/_services/taches.service';
import { TiersService } from 'src/app/_services/tiers.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';

@Component({
  selector: 'app-edit-ordre-intervention',
  templateUrl: './edit-ordre-intervention.component.html',
  styleUrls: ['./edit-ordre-intervention.component.css']
})
export class EditOrdreInterventionComponent implements OnInit {

  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[];  addNote=false;  tiers:any=[]; taches:any=[]; interventions:any=[];  _addTache:any=false;
  singleOrder:any={id:null, numero:null, vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:null, date_limite:null, note:null, en_reparation:null, en_instance:null, closed_at:null, user_affecter:null}
  singleTache:any={ordre_id_taches:null, intervention_id:null}

  constructor(
    private ordreInterventionService:OrdreInterventionService,
    private vehiculeService:VehiculeService,
    private conducteurService:ConducteurService,
    private utilisateurService:UtilisateurService,
    private activatedRoute: ActivatedRoute,
    private tiersService:TiersService,
    private tachesService:TachesService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllOrdres();
    this.getAllVehicules();
    this.getAllConducteurs();
    this.getAllUtilisateurs();
    this.getAllTiers();
    this.getInterventions();

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getOrderById(id);
        this.getAllTache(id);
      } 
    });

  }

  getOrderById(id: number){
    this.ordreInterventionService.getOrdreInterventionById(id).subscribe(
      res => {
        this.singleOrder = res;
        this.singleTache.ordre_id_taches=res.id;
      }
    )
  }

  getAllTiers(){
    this.tiersService.getAll().subscribe(
      res=> this.tiers=res
    )
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
      }
    )
  }

  getAllUtilisateurs(){
    this.utilisateurService.getAll().subscribe(
      res=> {
        this.utilisateurs=res;
      } 
    )
  }

  update(form:any){
    const id = form.user_affecter.split('.');
    this.ordreInterventionService.update({...form, [id[0] == 'c' ? 'conducteur_id' : id[0] == 'u' ? 'utilisateur_id' : 'tiers_id']: id[1] }).subscribe(
      res => {
        this.globale.closeModal();
        this.getOrderById(form.id);
      }
    )
  }

  getAllTache(id:number){
     this.tachesService.getAll(id).subscribe(
       res=> this.taches= res
     )
  }

  addTache(){
    this.tachesService.create(this.singleTache).subscribe(
      res=> {
         this.getAllTache(this.singleTache.ordre_id_taches);
         this._addTache=false;
      }
    )
  }

  deleteTache(id:number){
    this.tachesService.delete(this.singleTache.ordre_id_taches,id).subscribe(
      res => {
        this.getAllTache(this.singleTache.ordre_id_taches);
      }
    )
  }

  getInterventions(){
    this.tachesService.getInterventions().subscribe(
      res=> this.interventions=res
    )
  }

  changerStatutOrder(statut:any){
    this.ordreInterventionService.changeStatut({id:this.singleTache.ordre_id_taches, statut:statut}).subscribe(
      res=>{
        console.log("statut bien modifie !")
        this.getOrderById(this.singleTache.ordre_id_taches);
      } 
    )
  }

}
