import { Component, OnInit } from '@angular/core';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';

@Component({
  selector: 'app-piece-categories',
  templateUrl: './piece-categories.component.html',
  styleUrls: ['./piece-categories.component.css']
})
export class PieceCategoriesComponent implements OnInit {
  pieceCategories:any=[];


  constructor(
    private pieceCategoriesService: PieceCategoriesService
  ) { }

  ngOnInit(): void {
     this.getAll();
  }

  getAll(){
    this.pieceCategoriesService.getAll().subscribe(
      res=> this.pieceCategories=res
    )
  }

}
