import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { BonsTransfertDetailsService } from 'src/app/_services/bons-transfert-details.service';
import { BonsTransfertService } from 'src/app/_services/bons-transfert.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-bons-transfert',
  templateUrl: './edit-bons-transfert.component.html',
  styleUrls: ['./edit-bons-transfert.component.css']
})
export class EditBonsTransfertComponent implements OnInit {

  message:any=null;  entrepots:any=[]; list_detail_bonsT:any=[]; pieces:any=[];
  singleBonT:any={ id:null, source_entrepot_id:null, destination_entrepot_id:null, commentaire:null };
  singleDetailBT:any={id:null,numero:null, bon_transfert_id:null, piece_id:null, qte:null };


  constructor(
    private globale:Globale,
    private entrepotsService:EntrepotsService,
    private bonsTransfertService:BonsTransfertService,
    private bonsTransfertDetailsService: BonsTransfertDetailsService,
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService:PiecesRechangeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getBonReceptionById(id);
        this.getAllDetailsBT(id);
        this.getAllpiecesRechange();
        this.getAllEntrepots();
      } 
    });
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
          this.message="Bien ajouter !";
          this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.bonsTransfertDetailsService.update(form).subscribe(
        res=>{
          this.message="Bien modifie !";
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
        this.message='bien sup !';
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
      res => this.message="Bon reception bien modifie"
    )
  }


}
