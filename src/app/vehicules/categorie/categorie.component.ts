import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { VehiculeCategorieService } from '../../_services/vehicule-categorie.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories: any = []; message:any=null;
  singleCategorie: any = { id:null ,nom: null};
  
  constructor(
    private vehiculeCategorieService: VehiculeCategorieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllCategorie();
    this.closeModal();
  }
  
  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout() {
    this.authService.logout();
  }

  getAllCategorie() {
    this.vehiculeCategorieService.getAll().subscribe(
      result => this.categories = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllCategorie();
      }
    );
  }

  getCategorie(id: any) {
    this.message=null;
    this.vehiculeCategorieService.getCategorie(id).subscribe(
      res=> this.singleCategorie = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllCategorie();
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
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeCategorieService.update(form).subscribe(
        res => {
          this.getAllCategorie();
          this.message = "La catégorie est modifiée avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any) {
    this.vehiculeCategorieService.delete(id).subscribe(
      res => {
        this.getAllCategorie();
        this.message = "La catégorie est supprimée avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  clear() {
    this.message=null;
    this.singleCategorie = { id:null ,nom: null}
  }

}
