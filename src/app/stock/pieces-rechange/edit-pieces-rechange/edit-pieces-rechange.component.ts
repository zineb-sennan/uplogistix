import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { PieceCategoriesService } from 'src/app/_services/piece-categories.service';
import { PiecesRechangeService } from 'src/app/_services/pieces-rechange.service';

@Component({
  selector: 'app-edit-pieces-rechange',
  templateUrl: './edit-pieces-rechange.component.html',
  styleUrls: ['./edit-pieces-rechange.component.css']
})
export class EditPiecesRechangeComponent implements OnInit {

  singlePiece:any={ id:null, 	categorie_id:null, designation:null, description:null, unite_mesure:null, marque:null, reference:null, 	duree_vie_km:null, duree_vie_annee:null, alerte_km:null, alerte_jours:null, stock_min:null, gerer_stock:false }
  categories:any=[]; message:any=null;

  constructor(
    private pieceCategoriesService: PieceCategoriesService,
    private piecesRechangeService:PiecesRechangeService,
    private activatedRoute: ActivatedRoute,
    private globale:Globale,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories();

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this.getPieceById(id);
    });
  }

  getPieceById(id:number){
    this.piecesRechangeService.getPieceRechange(id).subscribe(
      res => this.singlePiece = res
    )
  }

  getAllCategories(){
    this.pieceCategoriesService.getAll().subscribe(
      res=> this.categories = res
    )
  }

  close(){
    this.globale.closeModal();
  }

  update(form:any){
    this.singlePiece.gerer_stock? this.singlePiece.gerer_stock= true: this.singlePiece.gerer_stock= false;
    
    if (!form.id) {
      this.piecesRechangeService.create(form).subscribe(
        res=>{
          this.router.navigate(['stock/pieces-rechange'])
        }
      )
    }
    else{
      this.piecesRechangeService.update(this.singlePiece).subscribe(
        res=>{
          this.router.navigate(['stock/pieces-rechange'])
        }
      )
    }
  }

}
