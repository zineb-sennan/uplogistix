import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { VehiculeGroupeService } from '../../_services/vehicule-groupe.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  groupes: any = [];
  singleGroupe: any = {id:null, nom: null, description:null };
  message:any=null;

  constructor(
    private vehiculeGroupeService: VehiculeGroupeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllGroupe();
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  logout() {
    this.authService.logout();
  }

  clear() {
    this.message=null;
    this.singleGroupe = {id:null, nom: null, description:null }
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  getAllGroupe() {
    this.vehiculeGroupeService.getAll().subscribe(
      result => this.groupes = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllGroupe();
      }
    );
  }

  getGroupe(id:number){
    this.message=null;
    this.vehiculeGroupeService.getGroupe(id).subscribe(
      res=>this.singleGroupe =res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getGroupe(id);
      }
    )}

  update(form: any) {
    if (!form.id) {
      this.vehiculeGroupeService.create(form).subscribe(
        res => {
          this.getAllGroupe();
          this.message = "Le groupe est ajouté avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    } else {
      this.vehiculeGroupeService.update(form).subscribe(
        res => {
          this.getAllGroupe();
          this.message = "Le groupe est modifié avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    }
  }

  delete(id:any) {
    this.vehiculeGroupeService.delete(id).subscribe(
      res => {
        this.getAllGroupe();
        this.message = "Le groupe est supprimé avec succès !";
        this.closeModal();
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.delete(id);
    })
  }

}
