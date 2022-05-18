import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ConducteurService } from '../../_services/conducteur.service';
import { ActivatedRoute } from '@angular/router';
import { PaysService } from '../../_services/pays.service';
import { RegionsService } from '../../_services/regions.service';
import { VillesService } from '../../_services/villes.service';
import { VehiculeService } from '../../_services/vehicule.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-globale',
  templateUrl: './globale.component.html',
  styleUrls: ['./globale.component.css']
})
export class GlobaleComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private conducteurService: ConducteurService,
    private activatedRoute: ActivatedRoute,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private vehiculeService: VehiculeService
  ) { }

  message:any = null; page = 0;
  conducteurs: any = []; pays: any[] = []; regions: any[] = []; villes: any[] = []; vehicules: any[] = [];
  singleConducteur: any = {
    id: null, nom: null, prenom: null, cni: null, email: null, tel: null, password: null, adresse: null, ville_id: null, n_badge:null,
    region_id: null, pays_id: null, locked_by: null, date_expiration: null, categorie_permis: null, vehicule_id: null, n_permis:null
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if (this.page) this.getAllConducteurs();
      this.getAllVehicules();
    });
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  clear() {
    this.message=null;
    this.singleConducteur = {
      id: null, nom: null, prenom: null, cni: null, email: null, tel: null, password: null, adresse: null, ville_id: null, n_badge:null,
      region_id: null, pays_id: null, locked_by: null, date_expiration: null, categorie_permis: null, vehicule_id: null, n_permis:null 
    }
  }

  logout() {
    this.authService.logout();
  }

  getAllVehicules() {
    this.vehiculeService.getAll().subscribe(
      res => {
        let usedVehicules: any = [];
        const c = this.conducteurs['records'].filter((c: any) => c.vehicule_id != null);
        c.forEach((item: any) => usedVehicules.push(item.vehicule_id));        
        this.vehicules = res.filter((v: any) => !usedVehicules.includes(v.id));

        if(this.singleConducteur.vehicule_id){
          let _vehicule=res.filter((v:any)=>v.id==this.singleConducteur.vehicule_id);
          this.vehicules.push(_vehicule[0]);
        }
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.getAllVehicules();
      }
    )
  }

  getAllConducteurs() {
    this.conducteurService.getAll(this.page).subscribe(
      result => this.conducteurs = result,
      error => {
        if (error.status == 401 && this.refreshToken()) this.getAllConducteurs();
      }
    );
  }

  getConducteur(id: number) {
    this.message = null;
    this.conducteurService.getConducteur(id).subscribe(
      res => {
        this.singleConducteur = res;
        this.getAllVehicules();
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.getConducteur(id);
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.conducteurService.create(form).subscribe(
        res => {
          this.getAllConducteurs();
          this.message = "Le conducteur est ajouté avec succès !";
          this.closeModal();
        },
        error => {
          if (error.status == 401 && this.refreshToken()) this.update(form);
        })
    } else {
      this.conducteurService.update(form).subscribe(res => {
        this.getAllConducteurs();
        this.message = "Le conducteur est modifié avec succès !";
        this.closeModal();
      },
        error => {
          if (error.status == 401 && this.refreshToken()) this.update(form);
        })
    }
  }

  delete(){
    this.conducteurService.delete(this.singleConducteur.id).subscribe(
      res=>{
        this.getAllConducteurs();
        this.message = "Le conducteur est supprimé avec succès !";
        this.closeModal();
      },error => {
          if (error.status == 401 && this.refreshToken()) this.delete();
      })
  }

}
