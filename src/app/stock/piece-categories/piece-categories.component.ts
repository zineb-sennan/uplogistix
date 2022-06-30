import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';

@Component({
  selector: 'app-piece-categories',
  templateUrl: './piece-categories.component.html',
  styleUrls: ['./piece-categories.component.css']
})
export class PieceCategoriesComponent implements OnInit {
  pieceCategories:any=[]; message:any=null;
  singlePieceCat:any={id:null, nom:null, description:null }


  constructor(
    private pieceCategoriesService: PieceCategoriesService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  clear(){
    this.singlePieceCat ={id:null, nom:null, description:null };
    this.message=null;
  }

  getAll(){
    this.pieceCategoriesService.getAll().subscribe(
      res=> this.pieceCategories = res
    )
  }

  getPieceCategorie(id:number){
    this.pieceCategoriesService.getPieceCat(id).subscribe(
      res => {
        this.singlePieceCat = res;
        this.getAll();
      }
    )
  }

  delete(id:number){
    this.pieceCategoriesService.delete(id).subscribe(
      res => {
        this.getAll();
        this.message ="La pièce catégorie est supprimée avec succès";
        this.globale.closeModal();
      }
    )
  }

  update(form: any){
    if(!form.id){
      this.pieceCategoriesService.create(form).subscribe(
        res=>{
          this.getAll();
          this.message ="La pièce catégorie est ajoutée avec succès";
        }
      )
    }
    else {
      this.pieceCategoriesService.update(form).subscribe(
        res=>{
          this.getAll();
          this.message ="La pièce catégorie est modifiée avec succès";
          this.globale.closeModal();
        }
      )
       
    }
  }

}
