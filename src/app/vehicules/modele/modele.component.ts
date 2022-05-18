import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { VehiculeCategorieService } from '../../_services/vehicule-categorie.service';
import { VehiculeMarqueService } from '../../_services/vehicule-marque.service';
import { VehiculeModeleService } from '../../_services/vehicule-modele.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.css']
})
export class ModeleComponent implements OnInit {

  message:any=null;
  modeles: any = []; categories: any = []; marques: any = [];
  singleModele: any = { id:null ,marque_id:null, categorie_id:null, nom: null };

  constructor(
    private vehiculeModeleService: VehiculeModeleService,
    private vehiculeMarqueService: VehiculeMarqueService,
    private vehiculeCategorieService: VehiculeCategorieService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const {id} = param;
      if(id){ this.getAllModeles(id); this.singleModele.marque_id=id; } 
    });
    
    this.getAllMarques();
    this.getAllCategorie();
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

  getAllModeles(id:number) {
    this.vehiculeModeleService.getModelesByMarqueId(id).subscribe( 
      result => this.modeles = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllModeles(id);
      }
    );
  }

  getAllMarques() {
    this.vehiculeMarqueService.getAll().subscribe(
      result => this.marques = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllMarques();
      });
  }

  getAllCategorie() {
    this.vehiculeCategorieService.getAll().subscribe(
      result => this.categories = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllCategorie();
      });
  }

  getModele(id:number){
    this.message=null;
    this.vehiculeModeleService.getModele(id).subscribe(
      res=>this.singleModele = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getModele(id);
    })
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeModeleService.create(form).subscribe(
        res => {
          this.getAllModeles(this.singleModele.marque_id);
          this.message = "Le modele est ajouté avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeModeleService.update(form).subscribe(res => {
        this.getAllModeles(this.singleModele.marque_id);
        this.message = "Le modele est modifié avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any) {
    this.vehiculeModeleService.delete(id).subscribe(res => {
      this.getAllModeles(this.singleModele.marque_id);
      this.message = "Le modele est supprimé avec succès !";
      this.closeModal();
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.delete(id);
    })
  }

  clear() {
    this.message=null;
    this.singleModele = { id:null, nom: null, description: null, marque_id: this.singleModele.marque_id, categorie_id:null }
  }

  // hoverViewBtn(){
  //   if(!this.isViewBtn) this.isViewBtn=true;
  //   else this.isViewBtn=false;
  // }

}
