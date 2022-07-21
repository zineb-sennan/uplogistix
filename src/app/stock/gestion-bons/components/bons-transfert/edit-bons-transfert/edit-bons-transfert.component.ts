import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { BonsTransfertDetailsService } from 'src/app/_services/bons-transfert-details.service';
import { BonsTransfertService } from 'src/app/_services/bons-transfert.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-bons-transfert',
  templateUrl: './edit-bons-transfert.component.html',
  styleUrls: ['./edit-bons-transfert.component.css']
})
export class EditBonsTransfertComponent implements OnInit {

  message:any=null;  entrepots:any=[]; list_detail_bonsT:any=[]; pieces:any=[]; categorie_pieces:any=[];
  singleBonT:any={ id:null, source_entrepot_id:null, destination_entrepot_id:null, commentaire:null };
  singleDetailBT:any={id:null,numero:null, bon_transfert_id:null, piece_id:null, qte:null };

  constructor(
    private globale:Globale,
    private entrepotsService:EntrepotsService,
    private bonsTransfertService:BonsTransfertService,
    private bonsTransfertDetailsService: BonsTransfertDetailsService,
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService:PiecesRechangeService,
    private pieceCategoriesService:PieceCategoriesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getBonReceptionById(id);
        this.getAllDetailsBT(id);
        this.getAllCategoriesOfPieces();
        this.getAllEntrepots();
      } 
    });
  }

  getAllCategoriesOfPieces(){
    this.pieceCategoriesService.getAll().subscribe(
      async res =>{
        const pieces= [...new Map([...await this.piecesRechangeService.getAll().toPromise()].map(item => [item['categorie_id'], item.categorie_id])).values()];
        this.categorie_pieces= [...res].filter(i=> pieces.includes(i.id));
      } 
    )
  }


 changeCategorie(e:any){
    this.piecesRechangeService.getPiecesByCategorie(e.target.value).subscribe(
      res=> this.pieces =res
    )
  }

  getAllpiecesRechange(){
    this.piecesRechangeService.getAll().subscribe(
      res=> this.pieces =res
    )
  }

  getDetailBtById(id:number){
    this.bonsTransfertDetailsService.getDetailsBT(id).subscribe(
      res => this.singleDetailBT= res
    )
  }

  updateDetailsBonT(form:any){
    if(!form.id){
      this.bonsTransfertDetailsService.create(form).subscribe(
        res=>{
          this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.bonsTransfertDetailsService.update(form).subscribe(
        res=>{
          this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
          this.globale.closeModal();
        } 
      )
    }
  }

  cleareDetailBT(){
    this.singleDetailBT ={id:null, piece_id:null, bon_transfert_id:this.singleDetailBT.bon_transfert_id, qte:null};
  }

  deleteDetailBT(id:number){
    this.bonsTransfertDetailsService.delete(id).subscribe(
      res=>{
        this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
        this.globale.closeModal();
      } 
    )
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  getAllDetailsBT(id:number){
    this.bonsTransfertDetailsService.getAll(id).subscribe(
      res=> this.list_detail_bonsT=res
    )
  }

  getBonReceptionById(id:number){
    this.bonsTransfertService.getBonTransfert(id).subscribe(
     res =>{
       this.singleBonT=res;
       this.singleDetailBT.bon_transfert_id=this.singleBonT.id;
     } 
    )
  }

  updateBonT(form:any){
    this.bonsTransfertService.update(form).subscribe(
      res => this.message="Bon transfert est modifie avec succès !"
    )
  }

  valide(id:number){
    this.bonsTransfertService.valide({id: id}).subscribe(
      res => {
        this.message ="Bon transfert est validé avec succès !";
        this.getBonReceptionById(id);
      }
    )
  }

  fermer(){
    this.globale.fermer();
  }


}
