import { Component, OnInit } from '@angular/core';
import { Globale } from 'src/app/_globale/globale';
import { BonsReceptionService } from 'src/app/_services/bons-reception.service';
import { BonsRetourService } from 'src/app/_services/bons-retour.service';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-bons-retour',
  templateUrl: './index-bons-retour.component.html',
  styleUrls: ['./index-bons-retour.component.css']
})
export class IndexBonsRetourComponent implements OnInit {
  list_bons_retour:any=[]; list_bons_reception:any=[]; message:any=''; entrepots:any= [];
  singleBonR:any={entrepot_id:null, bon_reception_id:null, commentaire:null }

  constructor(
    private bonsReceptionService: BonsReceptionService,
    private bonsRetourService: BonsRetourService,
    private entrepotsService: EntrepotsService,
    private globale: Globale,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBonsRetour();
    this.getAllBonReceptions();
    this.getAllEntrepots();
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
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
        this.router.navigate(['stock/bons-retour/'+res.id+'/edit']);
      } 
    )
  }

}
