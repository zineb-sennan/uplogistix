import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-detail-pieces-rechange',
  templateUrl: './detail-pieces-rechange.component.html',
  styleUrls: ['./detail-pieces-rechange.component.css']
})
export class DetailPiecesRechangeComponent implements OnInit {

  entrepots:any=[]; list_mov:any=[]; date=new Date();
  filter: any = { piece_id: null, date_debut: this.datePipe.transform((new Date(this.date.getFullYear(), this.date.getMonth(), 1)), "yyyy-MM-dd"), date_fin: this.datePipe.transform(this.date, 'yyyy-MM-dd') };

  constructor(
    private activatedRoute: ActivatedRoute,
    private piecesRechangeService:PiecesRechangeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) {
        this.getEntrepotsByPiece(id);
        this.filter.piece_id=id;
        this.getMovementsPieces();
      }
    });
  }

  getEntrepotsByPiece(id:number){
    this.piecesRechangeService.getEntrepotByPiece(id).subscribe(
      res =>{
        this.entrepots=res;
      }
    )
  }

  getMovementsPieces(){
    this.piecesRechangeService.getMovementsPieces(this.filter).subscribe(
      res => {
        this.list_mov=res.records;
      }
    )
  }

}
