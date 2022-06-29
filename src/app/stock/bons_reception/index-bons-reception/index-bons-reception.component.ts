import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { FournisseursService } from 'src/app/_services/fournisseurs.service';

@Component({
  selector: 'app-index-bons-reception',
  templateUrl: './index-bons-reception.component.html',
  styleUrls: ['./index-bons-reception.component.css']
})
export class IndexBonsReceptionComponent implements OnInit {

  message:any=null;  list_bon_receptions:any=[]; entrepots:any=[]; fournisseurs:any=[];
  singleBonR:any={ fournisseur_id:null, entrepot_id:null, commentaire:null }

  constructor(
    private bonsReceptionService:BonsReceptionService,
    private entrepotsService:EntrepotsService,
    private fournisseursService:FournisseursService,
    private globale:Globale
  ) { }

  ngOnInit(): void {
    this.getAllBonReceptions();
    this.getAllEntrepots();
    this.getAllFournisseurs();
  }

  getAllBonReceptions(){
    this.bonsReceptionService.getAll().subscribe(
      res=> this.list_bon_receptions=res
    )
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  // delete(id:number){
  //   console.log('**',id);
  //   this.bonsReceptionService.delete(id).subscribe(
  //     res => {
  //       this.getAllBonReceptions();
  //       this.message = "Bon reception est supprimé avec succès !";
  //       this.globale.closeModal();
  //     }
  //   )
  // }

  getAllFournisseurs(){
    this.fournisseursService.getAllFournisseurs().subscribe(
      res=> this.fournisseurs=res
    )
  }

  update(form:any){
     this.bonsReceptionService.create(form).subscribe(
        res=>{
          this.getAllBonReceptions();
          this.globale.closeModal();
          this.message="Bien ajouter !";
        } 
     )
  }

}
