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
import { MaintenancePreventiveService } from 'src/app/_services/maintenance-preventive.service';

@Component({
  selector: 'app-edit-ordre-intervention',
  templateUrl: './edit-ordre-intervention.component.html',
  styleUrls: ['./edit-ordre-intervention.component.css']
})
export class EditOrdreInterventionComponent implements OnInit {

  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[];  addNote=false;  tiers:any=[]; taches:any=[]; interventions:any=[];  _addTache:any=false; pieces:any=[]; piecesTache:any=[];
  singleOrder:any={id:null, numero:null, vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:'Normale', date_limite:null, note:null, en_reparation:null, en_instance:null, closed_at:null, user_affecter:null, progresOrder:null}
  singleTache:any={ordre_id_taches:null, intervention_id:null, note:null, id:null}

  singlePieceTache:any ={id:null, oi_tache_id:null, piece_id:null, qte:null, prix_unitaire:null, total:null }; type:any='ajouter-maintenance-order';

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
    private maintenancePreventiveService:MaintenancePreventiveService,
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

    this.activatedRoute.data.subscribe((data) => {
      this.type = data['title'];
      //
      this.activatedRoute.params.subscribe(param => {
        const { id } = param;
        if (id){
          if(this.type!='ajouter-maintenance-order'){
            this.getOrderById(id);
            this.getAllTache(id);
          }
          else {
            this.getInfosMP(id);
            this.singleOrder.vehicule_id=id;
          }
        } 
      });
    })
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
    if(this.singleOrder.id){
      this.ordreInterventionService.update({...form, [id[0] == 'c' ? 'conducteur_id' : id[0] == 'u' ? 'utilisateur_id' : 'tiers_id']: id[1] }).subscribe(
        res => {
          this.globale.closeModal();
          this.getOrderById(form.id);
        }
      )
    }
    else{
      this.ordreInterventionService.create({...form, [id[0] == 'c' ? 'conducteur_id' : id[0] == 'u' ? 'utilisateur_id' : 'tiers_id']: id[1] }).subscribe(
        res =>{
          this.getOrderById(res.id);
          this.singleTache.ordre_id_taches=res.id;

          for (let index = 0; index < this.taches.length; index++) {
            this.taches[index].ordre_id=this.singleOrder.id;
            this.singleTache.intervention_id=this.taches[index].intervention_id;
            this.addTache(index);
          }

        }
      )
    }
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
          pieces: resume
        }
      ))
    );
 }

  addTache(index:number){
    this.tachesService.create(this.singleTache).subscribe(
      res=> {
        if(this.type=='ajouter-maintenance-order'){
          this.taches[index].id=res.id;
        }
        else{
          this.getAllTache(this.singleTache.ordre_id_taches);
          this._addTache=false;
        }
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
    this.tachesService.update({id:tache.id, intervention_id:tache.intervention_id, ordre_id:this.singleOrder.id, note: this.singleTache.note}).subscribe(
      res => {
        if(this.type!='ajouter-maintenance-order') this.getAllTache(tache.ordre_id);
        else {
          tache.note=this.singleTache.note;
          tache.isNote=false;
        }
      }
    )
  }

  validateTache(tache:any, value:boolean){
    this.tachesService.validateTache({id:tache.id, ordre_id:tache.ordre_id, valider:value }).subscribe(
      res => {
        if(this.type!='ajouter-maintenance-order') this.getAllTache(tache.ordre_id);
        else {
          console.log(tache, res);
          tache.terminated_at= new Date();
          this.progresOrder();
        }
      }
    )
  }

  progresOrder(){
    const nbTaches = this.taches?.length;
    const nbTachesValides = [...this.taches].filter(t=> t.terminated_at)?.length;
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

 deletePieceTache(tache:any, piece:any){
  this.piecesTachesService.delete(tache.id,piece.id).subscribe(
    res =>{
      if(this.type!='ajouter-maintenance-order') this.getAllTache(this.singleTache.ordre_id_taches)
      else {
        tache.pieces = [...tache.pieces].filter(p=> p.id != piece.id);
        //Les couts
        tache.cout_tache = [...tache.pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
        this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
      }
    }
  )
 }

 updatePieceTache(tache:any, piece:any){
    this.piecesTachesService.update(this.singlePieceTache).subscribe(
      res =>{
        if(this.type!='ajouter-maintenance-order') this.getAllTache(this.singleTache.ordre_id_taches)
        else {
          piece.qte=this.singlePieceTache.qte;
          piece.prix_unitaire=this.singlePieceTache.prix_unitaire
          piece.total= Number(this.singlePieceTache.qte)*Number(this.singlePieceTache.prix_unitaire)
          piece.isEdit=false;
          //Les couts
          console.log(piece)
          tache.cout_tache = [...tache.pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
          this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
          //
          console.log(this.taches, 'taches');
        }
      } 
    )
 }

 onEditPieceOfTache(item:any, value:boolean){
    item.isEdit = value;
    this.singlePieceTache=item;
    this.singlePieceTache.total= this.singlePieceTache.qte * this.singlePieceTache.prix_unitaire;
 }

/** *** *** **/

  getInfosMP(id:number){
    this.maintenancePreventiveService.getPiecesByVehicule(id).subscribe(
      res => {
        this.taches = [...new Map([...res].map(item => [item['intervention_id'], item])).values()].map(t => ({ intervention_id: t.intervention_id, tache:t.intervention, cout_tache:0 }));
        for (let index = 0; index < this.taches.length; index++) {
          const item = [...res].filter(d=> d.intervention_id == this.taches[index].intervention_id).map(i=> ({ piece_id: i.piece_id, designation: i.designation, index:index }));
          this.taches[index].pieces_added = item;
          this.taches[index].pieces=[];
        }
      }
    )
  }

  _addPieceTache(item:any, tache_id:number){
    item.oi_tache_id= tache_id;
    this.piecesTachesService.create(item).subscribe(
      res=> {
        this.taches[item.index].pieces.push({...res, designation: item.designation});
        this.taches[item.index].pieces_added = [...this.taches[item.index].pieces_added].filter(p=> p.piece_id != item.piece_id);

        //Les couts
        this.taches[item.index].cout_tache = [...this.taches[item.index].pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
        this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
      }
    )
  }

  _deletePiece(item:any){
    this.taches[item.index].pieces_added = [...this.taches[item.index].pieces_added].filter(p=> p.piece_id != item.piece_id);
  }

  changeInputPiece(e:any, type:any, item:any){
    if(type == 'qtn') item.qte = e.target.value;
    else if(type == 'prix') item.prix_unitaire = e.target.value;
    if(item.qte && item.prix_unitaire) item.total = Number(item.qte)*Number(item.prix_unitaire);
  }



}
