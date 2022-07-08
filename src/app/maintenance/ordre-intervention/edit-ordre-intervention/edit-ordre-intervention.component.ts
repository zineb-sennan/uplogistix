import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { ConducteurService } from 'src/app/_services/conducteur.service';
import { OrdreInterventionService } from 'src/app/_services/ordre-intervention.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';
import { PiecesTachesService } from 'src/app/_services/pieces-taches.service';
import { TachesService } from 'src/app/_services/taches.service';
import { TiersService } from 'src/app/_services/tiers.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { VehiculeService } from 'src/app/_services/vehicule.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-ordre-intervention',
  templateUrl: './edit-ordre-intervention.component.html',
  styleUrls: ['./edit-ordre-intervention.component.css']
})
export class EditOrdreInterventionComponent implements OnInit {

  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[];  addNote=false;  tiers:any=[]; taches:any=[]; interventions:any=[];  _addTache:any=false; pieces:any=[]; piecesTache:any=[];
  singleOrder:any={id:null, numero:null, vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:null, date_limite:null, note:null, en_reparation:null, en_instance:null, closed_at:null, user_affecter:null, progresOrder:null}
  singleTache:any={ordre_id_taches:null, intervention_id:null, note:null, id:null}

  singlePieceTache:any ={id:null, oi_tache_id:null, piece_id:null, qte:null, prix_unitaire:null, total:null }

  constructor(
    private ordreInterventionService:OrdreInterventionService,
    private vehiculeService:VehiculeService,
    private conducteurService:ConducteurService,
    private utilisateurService:UtilisateurService,
    private activatedRoute: ActivatedRoute,
    private tiersService:TiersService,
    private tachesService:TachesService,
    private piecesTachesService :PiecesTachesService,
    private piecesRechangeService: PiecesRechangeService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllOrdres();
    this.getAllVehicules();
    this.getAllConducteurs();
    this.getAllUtilisateurs();
    this.getAllTiers();
    this.getInterventions();
    this.getAllPiecesRechange();

    /** */
    this.getAllPiecesTache(32);

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getOrderById(id);
        this.getAllTache(id);
      } 
    });
  }

  getAllPiecesRechange(){
    this.piecesRechangeService.getAll().subscribe(
      res => this.pieces=res
    )
  }

  getOrderById(id: number){
    this.ordreInterventionService.getOrdreInterventionById(id).subscribe(
      res => {
        this.singleOrder = res;
        this.singleTache.ordre_id_taches=res.id;
        { res.affecter_a.search("Tiers") != -1 ? this.singleOrder.user_affecter = ('t.'+ res.tiers_id) : res.affecter_a.search("Employé(e)") != -1 ? this.singleOrder.user_affecter = ('u.'+ res.utilisateur_id) : this.singleOrder.user_affecter = ('c.'+ res.conducteur_id) }
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

  async getAllTache(id:number){
    const taches$ = this.tachesService.getAll(id).pipe(
      switchMap(data => forkJoin(data.map(this.getAllPiecesTache.bind(this))))
    );
    this.taches= await taches$.toPromise();
    this.progresOrder();
  }

  getAllPiecesTache(tache: any){
    return this.piecesTachesService.getAll(tache.id).pipe(
      map(resume => (
        {
          ... tache,
          pieces: resume,
          __idTache:tache.id
        }
      ))
    );
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

  onEditNote(item:any, value:boolean){
    item.isNote= value;
    this.singleTache.note= item.note;
  }

  addNoteTache(tache:any){
    this.tachesService.update({id:tache.id, intervention_id:tache.intervention_id, ordre_id:tache.ordre_id, note: this.singleTache.note}).subscribe(
      res => {
        console.log("Note bien ajouter !!")
        this.getAllTache(tache.ordre_id);
      }
    )
  }

  validateTache(tache:any, value:boolean){
    this.tachesService.validateTache({id:tache.id, ordre_id:tache.ordre_id, valider:value }).subscribe(
      res => {
        console.log("Tache bien validé !!")
        this.getAllTache(tache.ordre_id);
      }
    )
  }

  progresOrder(){
    const nbTaches = this.taches.length;
    const nbTachesValides = [...this.taches].filter(t=> t.terminated_at).length;
    this.singleOrder.progresOrder=(nbTachesValides*100)/nbTaches;
  }

  onEditPiece(item:any, value:boolean){
    item.isPiece= value;
    this.singlePieceTache={id:null, oi_tache_id:item.id, piece_id:null, qte:null, prix_unitaire:null, total:null };
  }

 addPieceTache(){
  this.piecesTachesService.create(this.singlePieceTache).subscribe(
    res=> {
      this.getAllTache(this.singleTache.ordre_id_taches);
    }
  )
 }

 deletePieceTache(oi_tache_id:number, id:number){
  this.piecesTachesService.delete(oi_tache_id,id).subscribe(
    res => this.getAllTache(this.singleTache.ordre_id_taches)
  )
 }

 updatePieceTache(){
    this.piecesTachesService.update(this.singlePieceTache).subscribe(
      res => this.getAllTache(this.singleTache.ordre_id_taches)
    )
 }

 onEditPieceOfTache(item:any, value:boolean){
    item.isEdit = value;
    this.singlePieceTache=item;
    this.singlePieceTache.total= this.singlePieceTache.qte * this.singlePieceTache.prix_unitaire;
 }



}
