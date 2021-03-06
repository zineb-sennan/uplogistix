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
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { BonsReceptionDetailsService } from 'src/app/_services/bons-reception-details.service';
import { FournisseursService } from 'src/app/_services/fournisseurs.service';

@Component({
  selector: 'app-edit-ordre-intervention',
  templateUrl: './edit-ordre-intervention.component.html',
  styleUrls: ['./edit-ordre-intervention.component.css']
})
export class EditOrdreInterventionComponent implements OnInit {

  ordres:any=[]; vehicules:any=[]; conducteurs:any=[]; utilisateurs:any=[];  addNote=false;  tiers:any=[]; taches:any=[]; interventions:any=[];  _addTache:any=false; pieces:any=[]; piecesTache:any=[];
  singleOrder:any={id:null, numero:null, vehicule_id:null, conducteur_id:null, utilisateur_id:null, tiers_id:null, priorite:'Normale', date_limite:null, note:null, en_reparation:null, en_instance:null, closed_at:null, user_affecter:null, progresOrder:null}
  singleTache:any={ordre_id_taches:null, intervention_id:null, note:null, id:null}

  singlePieceTache:any ={id:null, oi_tache_id:null, piece_id:null, qte:null, prix_unitaire:null, total:null }; type:any='ajouter-maintenance-order'; orders_error:any=[];

  error:any=null; fournisseurs:any=[];

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
    private globale:Globale,
    private bonsReceptionService:BonsReceptionService,
    private bonsReceptionDetailsService:BonsReceptionDetailsService,
    private fournisseursService:FournisseursService
  ) { }

  ngOnInit(): void {
    this.getAllOrdres();
    this.getAllVehicules();
    this.getAllConducteurs();
    this.getAllUtilisateurs();
    this.getAllTiers();
    this.getInterventions();
    this.getAllFournisseurs();

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

  getOrderById(id: number){
    this.ordreInterventionService.getOrdreInterventionById(id).subscribe(
      res => {
        this.singleOrder = res;
        this.singleTache.ordre_id_taches=res.id;
        { res.affecter_a.search("Tiers") != -1 ? this.singleOrder.user_affecter = ('t.'+ res.tiers_id) : res.affecter_a.search("Employ??(e)") != -1 ? this.singleOrder.user_affecter = ('u.'+ res.utilisateur_id) : this.singleOrder.user_affecter = ('c.'+ res.conducteur_id) }
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
    this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
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
      async res=> {
        if(this.type=='ajouter-maintenance-order'){
          if(index != -1) this.taches[index].id=res.id;
          else{
            const item= {
              intervention_id: res.intervention_id,
              tache: [...this.interventions].filter(i => i.id==res.intervention_id)[0].libelle,
              cout_tache:0,
              ordre_id:null,
              id: res.id,
              pieces_added:[],
              pieces:[],
              list_pieces: await this.piecesRechangeService.getPiecesByCategorie(res.intervention_id).toPromise()
            }
            this.taches.push(item);
            this._addTache=false;
          }
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
        if(this.type=='ajouter-maintenance-order') this.taches = [...this.taches].filter(t => t.id!=id);
        else this.getAllTache(this.singleTache.ordre_id_taches);
      }
    )
  }

   getInterventions(){
    this.tachesService.getInterventions().subscribe(
      res=>{
        this.interventions=res;
      } 
    )
  }

  changerStatutOrder(statut:any){
    if(statut=="cloturer" && [...this.taches].length != [...this.taches].filter(t=> t.terminated_at).length) this.error="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua !";
    else {
      this.ordreInterventionService.changeStatut({id:this.singleTache.ordre_id_taches, statut:statut}).subscribe(
        res=> this.getOrderById(this.singleTache.ordre_id_taches)
      )
    }
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

  openModal(){
    //console.log("Bonjour !");
    $("body").append("<div class='modal-backdrop fade show'></div>");
    $("#modal-add-bons-reception").addClass("show");
    $("#modal-add-bons-reception").css("display", "block");
    $("body").css("display", "block");
  }

  closeModal(){
    $('#modal-add-bons-reception').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  createBonsReception(order:any){
    console.log('Order: ',order, order.fournisseur_id);
    if(order.fournisseur_id){
      this.bonsReceptionService.create({fournisseur_id: order.fournisseur_id}).subscribe(
        res=>{
          //console.log("Bons R bien ajouter !");
          order.order_id_add= res;
          const record= {bon_reception_id:res.id, piece_id:order.piece_id, qte:order.qte_manquante, prix_unitaire:order.prix_unitaire, categorie_id:order.categorie_id};
          //console.log(record, order, 'add details');
          this.bonsReceptionDetailsService.create(record).subscribe(
            res=>{
              //console.log("dtail bons reception bien ajouter !")
            } 
          )
        } 
      )
    }
    else console.log("Pas de order !");
    
  }

  changeFournisseur(e:any, item:any){
    item.fournisseur_id= e.target.value;
    //console.log(item, "***");
  }

  getAllFournisseurs(){
    this.fournisseursService.getAllFournisseurs().subscribe(
      res=> this.fournisseurs=res
    )
  }

  validateTache(tache:any, value:boolean){
    /** validation de la tache **/
    if(!this.singleOrder.closed_at){
      this.tachesService.validateTache({id:tache.id, ordre_id:tache.ordre_id, valider:value }).subscribe(
        res => {
          if(this.type!='ajouter-maintenance-order') this.getAllTache(tache.ordre_id);
          else {
            tache.terminated_at= new Date();
            this.progresOrder();
          }
        },
        error =>{
          this.openModal();
          this.orders_error=error.error;
          this.orders_error.pieces=tache.pieces;
          for (let index = 0; index < this.orders_error.length; index++) {
            this.orders_error[index].prix_unitaire = [...tache.pieces].filter(p=>p.id==tache.pieces[index].id)[0].prix_unitaire;
          }
        }
      )
    }
  }

  progresOrder(){
    if(this.taches){
      const nbTaches = [...this.taches].length;
      const nbTachesValides = [...this.taches].filter(t=> t.terminated_at)?.length;
      if(nbTaches>0) this.singleOrder.progresOrder=(nbTachesValides*100)/nbTaches;
    }
  }

  async onEditPiece(item:any, value:boolean){
    item.isPiece= value;
    this.singlePieceTache={id:null, oi_tache_id:item.id, piece_id:null, qte:null, prix_unitaire:null, total:null };
    item.list_pieces= await this.piecesRechangeService.getPiecesByCategorie(item.intervention_id).toPromise();
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
          tache.cout_tache = [...tache.pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
          this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
        }
        
      } 
    )
 }

  async onEditPieceOfTache(tache:any, piece:any, value:boolean){
    piece.isEdit = value;
    this.singlePieceTache=piece;
    this.singlePieceTache.total= this.singlePieceTache.qte * this.singlePieceTache.prix_unitaire;
    tache.list_pieces= await this.piecesRechangeService.getPiecesByCategorie(tache.intervention_id).toPromise();
  }


  getInfosMP(id:number){
    console.log("bonjour function getInfosMP");
    this.maintenancePreventiveService.getPiecesByVehicule(id).subscribe(
      async res => {
        this.taches = [...new Map([...res].map(item => [item['intervention_id'], item])).values()].map(t => ({ intervention_id: t.intervention_id, tache:t.intervention, cout_tache:0 }));
        for (let index = 0; index < this.taches.length; index++) {
          const item = [...res].filter(d=> d.intervention_id == this.taches[index].intervention_id).map(i=> ({ piece_id: i.piece_id, designation: i.designation, index:index }));
          this.taches[index].pieces_added = item;
          this.taches[index].pieces=[];
          this.taches[index].list_pieces = await this.piecesRechangeService.getPiecesByCategorie(this.taches[index].intervention_id).toPromise();
        }
      }
    )
  }

  _addPieceTache(item:any, tache:any){
    item.oi_tache_id= tache.id;

    this.piecesTachesService.create(item).subscribe(
      res=> {
        //
        if(!item.designation) item.designation= [...this.pieces].filter(p=> p.id == item.piece_id)[0].designation;
        tache.pieces.push({...res, designation: item.designation });
        tache.pieces_added = [...tache.pieces_added].filter(p=> p.piece_id != item.piece_id);
        //Les couts
        tache.cout_tache = [...tache.pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
        this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
        //
        tache.isPiece=false;
      }
    )
  }

  _deletePiece(item:any){
    this.taches[item.index].pieces_added = [...this.taches[item.index].pieces_added].filter(p=> p.piece_id != item.piece_id);
    //Les couts
    this.taches[item.index].cout_tache = [...this.taches[item.index].pieces].reduce((prev,next)=>prev+Number(next.prix_unitaire*next.qte),0);
    this.singleOrder.cout_total = [...this.taches].reduce((prev,next)=>prev+Number(next.cout_tache),0);
  }

  changeInputPiece(e:any, type:any, item:any){
    if(type == 'qtn') item.qte = e.target.value;
    else if(type == 'prix') item.prix_unitaire = e.target.value;
    if(item.qte && item.prix_unitaire) item.total = Number(item.qte)*Number(item.prix_unitaire);
  }

  getPiecesByInventaire(id:number){
    this.piecesRechangeService.getPiecesByCategorie(id).subscribe(
      res => this.pieces=res
    )
  }

  changeIntervention(e :any){
    this.getPiecesByInventaire(e.target.value);
  }

}
