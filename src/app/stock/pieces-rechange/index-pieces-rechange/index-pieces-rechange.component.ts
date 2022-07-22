import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-index-pieces-rechange',
  templateUrl: './index-pieces-rechange.component.html',
  styleUrls: ['./index-pieces-rechange.component.css']
})
export class IndexPiecesRechangeComponent implements OnInit {

  list_pieces_rechange:any=[]; message:any=null; piece_id:number=0; entrepot:any=[];

  constructor(
    private piecesRechangeService: PiecesRechangeService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllpiecesRechange();
  }

  getAllpiecesRechange(){
    this.piecesRechangeService.getAll().subscribe(
      res=> this.list_pieces_rechange =res
    )
  }

  delete(id:number){
    this.piecesRechangeService.delete(id).subscribe(
      res => {
        this.getAllpiecesRechange();
        this.message = "Piece de rechange est supprimé avec succès .";
        this.globale.closeModal();
      }
    )
  }

  getEntrepotsByPiece(id:number){
    this.piecesRechangeService.getEntrepotByPiece(id).subscribe(
      res =>{
        this.entrepot=res;
      }
    )
  }

}
