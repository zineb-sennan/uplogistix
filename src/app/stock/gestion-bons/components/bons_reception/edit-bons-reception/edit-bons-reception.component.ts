import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { BonsReceptionDetailsService } from 'src/app/_services/bons-reception-details.service';
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { FournisseursService } from 'src/app/_services/fournisseurs.service';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-bons-reception',
  templateUrl: './edit-bons-reception.component.html',
  styleUrls: ['./edit-bons-reception.component.css']
})
export class EditBonsReceptionComponent implements OnInit {
  
  message:any=null; detailsBRs:any=[]; pieces:any=[]; entrepots:any=[]; fournisseurs:any=[]; categorie_pieces:any=[];
  singleBonR:any= { id:null, numero:null, fournisseur_id:null, entrepot_id:null, commentaire:null, validated_at:null, validated_by:null };
  singleDetailBR:any={id:null, bon_reception_id:null, piece_id:null, qte:null, prix_unitaire:null, categorie_id:null };

  constructor(
    private bonsReceptionService:BonsReceptionService,
    private entrepotsService:EntrepotsService,
    private fournisseursService:FournisseursService,
    private activatedRoute: ActivatedRoute,
    private bonsReceptionDetailsService:BonsReceptionDetailsService,
    private piecesRechangeService: PiecesRechangeService,
    private pieceCategoriesService: PieceCategoriesService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllEntrepots();
    this.getAllFournisseurs();
    

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getBonReceptionById(id);
        this.getAllDetailsBR(id);
        this. getAllCategoriesOfPieces();
      } 
    });
  }

  changeCategorie(e:any){
    this.piecesRechangeService.getPiecesByCategorie(e.target.value).subscribe(
      res=> this.pieces =res
    )
  }
  
  getAllCategoriesOfPieces(){
    this.pieceCategoriesService.getAll().subscribe(
      async res =>{
        const pieces= [...new Map([...await this.piecesRechangeService.getAll().toPromise()].map(item => [item['categorie_id'], item.categorie_id])).values()];
        this.categorie_pieces= [...res].filter(i=> pieces.includes(i.id));
      } 
    )
  }



  getDetailBrById(id:number){
    this.bonsReceptionDetailsService.getDetailsBR(id).subscribe(
      res => this.singleDetailBR= res
    )
  }

  updateDetailsBonR(form:any){
    if(!form.id){
      this.bonsReceptionDetailsService.create(form).subscribe(
        res=>{
          this.getAllDetailsBR(this.singleDetailBR.bon_reception_id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.bonsReceptionDetailsService.update(form).subscribe(
        res=>{
          this.getAllDetailsBR(this.singleDetailBR.bon_reception_id);
          this.globale.closeModal();
        } 
      )
    }
  }

  cleareDetailBR(){
    this.singleDetailBR = {id:null, piece_id:null, bon_reception_id:this.singleDetailBR.bon_reception_id, qte:null, prix_unitaire:null, categorie_id:null };
  }

  deleteDetailBR(id:number){
    this.bonsReceptionDetailsService.delete(id).subscribe(
      res=>{
        this.getAllDetailsBR(this.singleDetailBR.bon_reception_id);
        this.globale.closeModal();
      } 
    )
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  getAllDetailsBR(id:number){
    this.bonsReceptionDetailsService.getAll(id).subscribe(
      res=> this.detailsBRs=res
    )
  }

  getBonReceptionById(id:number){
     this.bonsReceptionService.getBonReception(id).subscribe(
      res =>{
        this.singleBonR=res;
        this.singleDetailBR.bon_reception_id=this.singleBonR.id;
      } 
     )
  }

  getAllFournisseurs(){
    this.fournisseursService.getAllFournisseurs().subscribe(
      res=> this.fournisseurs=res
    )
  }

  updateBonR(form:any){
    this.bonsReceptionService.update(form).subscribe(
      res => this.message="Bon reception bien modifie"
    )
  }

  valide(id:number){
    this.bonsReceptionService.valideStock({id: id}).subscribe(
      res => {
        this.message ="Bon reception bien validé !";
        this.getBonReceptionById(id);
      }
    )
  }

  fermer(){
    this.globale.fermer();
  }

}
