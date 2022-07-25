import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  list_bon_receptions:any=[]; entrepots:any=[]; fournisseurs:any=[];
  singleBonR:any={ fournisseur_id:null, commentaire:null }

  constructor(
    private bonsReceptionService:BonsReceptionService,
    private entrepotsService:EntrepotsService,
    private fournisseursService:FournisseursService,
    private globale:Globale,
    private router: Router
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
        this.router.navigate(['stock/bons-reception/'+res.id+'/edit']);
      } 
    )
  }

}
