import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { BonsTransfertService } from 'src/app/_services/bons-transfert.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';

@Component({
  selector: 'app-index-bons-transfert',
  templateUrl: './index-bons-transfert.component.html',
  styleUrls: ['./index-bons-transfert.component.css']
})
export class IndexBonsTransfertComponent implements OnInit {

  message:any=null;  entrepots:any=[]; list_bons_transfert:any=[];
  singleBonT:any={ id:null, source_entrepot_id:null, destination_entrepot_id:null, commentaire:null };

  constructor(
    private bonsTransfertService: BonsTransfertService,
    private entrepotsService:EntrepotsService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllEntrepots();
    this.getAllBonsTransfert();
  }

  getAllBonsTransfert(){
    this.bonsTransfertService.getAll().subscribe(
      res=> this.list_bons_transfert=res
    )
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  delete(id:number){
    this.bonsTransfertService.delete(id).subscribe(
      res => {
        this.getAllBonsTransfert();
        this.message = "Bon transfert est supprimé avec succès !";
        this.globale.closeModal();
      }
    )
  }

  update(form:any){
    this.bonsTransfertService.create(form).subscribe(
      res => {
        this.getAllBonsTransfert();
        this.globale.closeModal();
        this.message="Bien ajouter !";
      } 
    )
 }

}
