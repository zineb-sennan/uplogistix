import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculeCategorieService } from '../../_services/vehicule-categorie.service';
import { VehiculeMarqueService } from '../../_services/vehicule-marque.service';
import { VehiculeModeleService } from '../../_services/vehicule-modele.service';
import { Globale } from '../../_globale/globale';
import { SecuriteClass } from '../../_globale/securite';

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
    private securiteClass: SecuriteClass,
    private globale:Globale,
    private vehiculeModeleService: VehiculeModeleService,
    private vehiculeMarqueService: VehiculeMarqueService,
    private vehiculeCategorieService: VehiculeCategorieService,
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

  getAllModeles(id:number) {
    this.vehiculeModeleService.getModelesByMarqueId(id).subscribe( 
      result => this.modeles = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllModeles(id);
      }
    );
  }

  getAllMarques() {
    this.vehiculeMarqueService.getAll().subscribe(
      result => this.marques = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllMarques();
      });
  }

  getAllCategorie() {
    this.vehiculeCategorieService.getAll().subscribe(
      result => this.categories = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllCategorie();
      });
  }

  getModele(id:number){
    this.message=null;
    this.vehiculeModeleService.getModele(id).subscribe(
      res=>this.singleModele = res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getModele(id);
    })
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeModeleService.create(form).subscribe(
        res => {
          this.getAllModeles(this.singleModele.marque_id);
          this.message = "Le modele est ajouté avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    } else {
      this.vehiculeModeleService.update(form).subscribe(res => {
        this.getAllModeles(this.singleModele.marque_id);
        this.message = "Le modele est modifié avec succès !";
        this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any) {
    this.vehiculeModeleService.delete(id).subscribe(res => {
      this.getAllModeles(this.singleModele.marque_id);
      this.message = "Le modele est supprimé avec succès !";
      this.globale.closeModal();
    },
    error => {
      if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
    })
  }

  clear() {
    this.message=null;
    this.singleModele = { id:null, nom: null, description: null, marque_id: this.singleModele.marque_id, categorie_id:null }
  }

}
