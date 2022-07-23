import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globale } from 'src/app/_globale/globale';
import { EntrepotsService } from 'src/app/_services/entrepots.service';
import { InventairesService } from 'src/app/_services/inventaires.service';

@Component({
  selector: 'app-index-inventaires',
  templateUrl: './index-inventaires.component.html',
  styleUrls: ['./index-inventaires.component.css']
})
export class IndexInventairesComponent implements OnInit {

  entrepots:any=[]; list_inventaires:any=[];
  singleInventaire:any={ id:null, entrepot_id:null, commentaire:null };

  constructor(
    private entrepotsService:EntrepotsService,
    private inventairesService:InventairesService,
    private globale:Globale,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllInventaires();
    this.getAllEntrepots();
  }

  getAllEntrepots(){
    this.entrepotsService.getAll().subscribe(
      res=> this.entrepots=res
    )
  }

  getAllInventaires(){
    this.inventairesService.getAll().subscribe(
      res=> this.list_inventaires=res
    )
  }

  update(form:any){
    this.inventairesService.create(form).subscribe(
      res => {
        this.getAllInventaires();
        this.globale.closeModal();
        this.router.navigate(['stock/inventaires/'+res.id+'/edit']);
      } 
    )
 }

}
