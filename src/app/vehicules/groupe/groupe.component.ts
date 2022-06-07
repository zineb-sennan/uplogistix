import { Component, OnInit } from '@angular/core';
import { VehiculeGroupeService } from '../../_services/vehicule-groupe.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';

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
    private securiteClass: SecuriteClass,
    private globale:Globale,
    private vehiculeGroupeService: VehiculeGroupeService
  ) {}

  ngOnInit(): void {
    this.getAllGroupe();
  }

  clear() {
    this.message=null;
    this.singleGroupe = {id:null, nom: null, description:null }
  }

  getAllGroupe() {
    this.vehiculeGroupeService.getAll().subscribe(
      result => this.groupes = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllGroupe();
      }
    );
  }

  getGroupe(id:number){
    this.message=null;
    this.vehiculeGroupeService.getGroupe(id).subscribe(
      res=>this.singleGroupe =res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getGroupe(id);
      }
    )}

  update(form: any) {
    if (!form.id) {
      this.vehiculeGroupeService.create(form).subscribe(
        res => {
          this.getAllGroupe();
          this.message = "Le groupe est ajouté avec succès !";
          this.globale.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
        })
    } else {
      this.vehiculeGroupeService.update(form).subscribe(
        res => {
          this.getAllGroupe();
          this.message = "Le groupe est modifié avec succès !";
          this.globale.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
        })
    }
  }

  delete(id:any) {
    this.vehiculeGroupeService.delete(id).subscribe(
      res => {
        this.getAllGroupe();
        this.message = "Le groupe est supprimé avec succès !";
        this.globale.closeModal();
    },
    error => {
      if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
    })
  }

}
