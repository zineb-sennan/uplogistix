import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { InventaireDetailsService } from 'src/app/_services/inventaire-details.service';
import { InventairesService } from 'src/app/_services/inventaires.service';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-inventaires',
  templateUrl: './edit-inventaires.component.html',
  styleUrls: ['./edit-inventaires.component.css']
})
export class EditInventairesComponent implements OnInit {

  message:any=null;  entrepots:any=[]; list_detail_inventaire:any=[]; pieces:any=[]; categorie_pieces:any=[];
  singleInventaire:any = { id:null, entrepot_id:null, commentaire:null };
  singleDetailInventaire:any = {id:null,inventaire_id:null, piece_id:null, qte:null, categorie_id:null };

  constructor(
    private globale:Globale,
    private entrepotsService:EntrepotsService,
    private inventairesService:InventairesService,
    private inventaireDetailsService:InventaireDetailsService,
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService:PiecesRechangeService,
    private pieceCategoriesService:PieceCategoriesService
  ) { }

  ngOnInit(): void {
    this.getAllEntrepots();

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id){
        this.getInventaireById(id);
        this.getAllDetailsInventaire(id);
        this.getAllCategoriesOfPieces();
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

  getPiecesByCategorieId(id:number){
    this.piecesRechangeService.getPiecesByCategorie(id).subscribe(
      res=> this.pieces =res
    )
  }

  changeCategorie(e:any){
    this.getPiecesByCategorieId(e.target.value);
  }

  getDetailInventaireById(id:number){
    this.inventaireDetailsService.getDetailsBT(id).subscribe(
      res => {
        this.singleDetailInventaire= res;
        this.getPiecesByCategorieId(res.categorie_id);
      }
    )
  }

  updateDetailsInventaire(form:any){
    if(!form.id){
      this.inventaireDetailsService.create(form).subscribe(
        res=>{
          this.getAllDetailsInventaire(this.singleInventaire.id);
          this.globale.closeModal();
        } 
      )
    }
    else{
      this.inventaireDetailsService.update(form).subscribe(
        res=>{
          this.getAllDetailsInventaire(this.singleInventaire.id);
          this.globale.closeModal();
        } 
      )
    }
  }

  clearDetailInventaire(){
    this.singleDetailInventaire ={id:null, piece_id:null, inventaire_id:this.singleDetailInventaire.inventaire_id, qte:null, categorie_id:null};
  }

  deleteDetailInventaire(id:number){
    this.inventaireDetailsService.delete(id).subscribe(
      res=>{
        this.getAllDetailsInventaire(this.singleInventaire.id);
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
      res => this.message="l'inventaire est modifié avec succès !"
    )
  }

  fermer(){
    this.globale.fermer();
  }

  valide(id:number){
    this.inventairesService.valide({id: id}).subscribe(
      res => {
        this.message ="l'inventaire est validé avec succès !";
        this.getAllDetailsInventaire(id);
      }
    )
  }

}
