import { Component, OnInit } from '@angular/core';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';

@Component({
  selector: 'app-piece-categories',
  templateUrl: './piece-categories.component.html',
  styleUrls: ['./piece-categories.component.css']
})
export class PieceCategoriesComponent implements OnInit {
  pieceCategories:any=[]; message:any=null;
  singlePieceCatForm:any={id:null, nom:null, description:null }


  constructor(
    private pieceCategoriesService: PieceCategoriesService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  clear(){
    this.singlePieceCatForm=null;
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
        this.singlePieceCatForm = res;
        this.getAll();
      }
    )
  }

  delete(id:number){
    this.pieceCategoriesService.delete(id).subscribe(
      res => {
        this.getAll();
      }
    )
  }

  update(form: any){
    if(!form.id){
      this.pieceCategoriesService.create(form).subscribe(
        res=>{
          this.getAll();
        }
      )
    }
    else {
      this.pieceCategoriesService.update(form).subscribe(
        res=>{
          this.getAll();
        }
      )
       
    }
  }

}
