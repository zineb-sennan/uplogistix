import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { BonsRetourService } from 'src/app/_services/bons-retour.service';

@Component({
  selector: 'app-index-bons-retour',
  templateUrl: './index-bons-retour.component.html',
  styleUrls: ['./index-bons-retour.component.css']
})
export class IndexBonsRetourComponent implements OnInit {
  list_bons_retour:any=[]; list_bons_reception:any=[]; message:any='';
  singleBonR:any={ bon_reception_id:null, commentaire:null }

  constructor(
    private bonsReceptionService:BonsReceptionService,
    private bonsRetourService: BonsRetourService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllBonsRetour();
    this.getAllBonReceptions();
  }

  getAllBonsRetour(){
    this.bonsRetourService.getAll().subscribe(
      res=> this.list_bons_retour=res
    )
  }

  getAllBonReceptions(){
    this.bonsReceptionService.getAll().subscribe(
      res=> this.list_bons_reception=res
    )
  }

  update(form:any){
    this.bonsRetourService.create(form).subscribe(
      res=>{
        this.getAllBonsRetour();
        this.globale.closeModal();
        this.message="Bien ajouter !";
      } 
    )
  }

}
