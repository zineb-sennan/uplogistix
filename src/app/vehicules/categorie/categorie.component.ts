import { Component, OnInit } from '@angular/core';
import { VehiculeCategorieService } from '../../_services/vehicule-categorie.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories: any = []; message:any=null;
  singleCategorie: any = { id:null ,nom: null};
  
  constructor(
    private securiteClass: SecuriteClass,
    private globale:Globale,
    private vehiculeCategorieService: VehiculeCategorieService
  ) { }

  ngOnInit(): void {
    this.getAllCategorie();
    this.globale.closeModal();
  }

  getAllCategorie() {
    this.vehiculeCategorieService.getAll().subscribe(
      result => this.categories = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllCategorie();
      }
    );
  }

  getCategorie(id: any) {
    this.message=null;
    this.vehiculeCategorieService.getCategorie(id).subscribe(
      res=> this.singleCategorie = res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllCategorie();
      }
    )
    ;
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeCategorieService.create(form).subscribe(
        res => {
          this.getAllCategorie();
          this.message = "La catégorie est ajoutée avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeCategorieService.update(form).subscribe(
        res => {
          this.getAllCategorie();
          this.message = "La catégorie est modifiée avec succès !";
          this.globale.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any) {
    this.vehiculeCategorieService.delete(id).subscribe(
      res => {
        this.getAllCategorie();
        this.message = "La catégorie est supprimée avec succès !";
        this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
      })
  }

  clear() {
    this.message=null;
    this.singleCategorie = { id:null ,nom: null}
  }

}
