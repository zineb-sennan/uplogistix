import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { EntrepotsService } from 'src/app/_services/entrepots.service';

@Component({
  selector: 'app-index-entrepot',
  templateUrl: './index-entrepot.component.html',
  styleUrls: ['./index-entrepot.component.css']
})
export class IndexEntrepotComponent implements OnInit {

  entrepots:any=[]; message:any=''; entrepot_id:number=0;

  constructor(
    private entrepotsService:EntrepotsService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllEntrepots()
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  delete(id:number){
    this.entrepotsService.delete(id).subscribe(
      res => {
        this.getAllEntrepots();
        this.message = "L'entrepot est supprimé avec succès !";
        this.globale.closeModal();
      }
    )
  }
}
