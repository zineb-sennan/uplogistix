import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { InventaireDetailsService } from 'src/app/_services/inventaire-details.service';
import { InventairesService } from 'src/app/_services/inventaires.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-inventaires',
  templateUrl: './edit-inventaires.component.html',
  styleUrls: ['./edit-inventaires.component.css']
})
export class EditInventairesComponent implements OnInit {

  message:any=null;  entrepots:any=[]; list_detail_inventaire:any=[]; pieces:any=[];
  singleInventaire:any = { id:null, entrepot_id:null, commentaire:null };
  singleDetailInventaire:any = {id:null,inventaire_id:null, piece_id:null, qte:null };

  constructor(
    private globale:Globale,
    private entrepotsService:EntrepotsService,
    private inventairesService:InventairesService,
    private inventaireDetailsService:InventaireDetailsService,
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService:PiecesRechangeService
  ) { }

  ngOnInit(): void {
  }

  getAllpiecesRechange(){
    this.piecesRechangeService.getAll().subscribe(
      res=> this.pieces =res
    )
  }

  getDetailInventaireById(id:number){
    this.inventaireDetailsService.getDetailsBT(id).subscribe(
      res => this.singleDetailInventaire= res
    )
  }

  updateDetailsInventaire(form:any){
    if(!form.id){
      this.inventaireDetailsService.create(form).subscribe(
        res=>{
          this.message="Bien ajouter !";
          //this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.inventaireDetailsService.update(form).subscribe(
        res=>{
          this.message="Bien modifie !";
          //this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
          this.globale.closeModal();
        } 
      )
    }
  }

  clearDetailInventaire(){
    this.singleDetailInventaire ={id:null, piece_id:null, inventaire_id:this.singleDetailInventaire.inventaire_id, qte:null};
  }

  deleteDetailInventaire(id:number){
    this.inventaireDetailsService.delete(id).subscribe(
      res=>{
        this.message='bien sup !';
        //this.getAllDetailsBT(this.singleDetailBT.bon_transfert_id);
        this.globale.closeModal();
      } 
    )
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  getAllDetailsInventaire(id:number){
    this.inventaireDetailsService.getAll(id).subscribe(
      res=> this.list_detail_inventaire=res
    )
  }

  getInventaireById(id:number){
    this.inventairesService.getInventaire(id).subscribe(
     res =>{
       this.singleInventaire=res;
       this.singleDetailInventaire.inventaire_id=this.singleInventaire.id;
     } 
    )
  }

  updateInventaire(form:any){
    this.inventairesService.update(form).subscribe(
      res => this.message="Bon reception bien modifie"
    )
  }

}
