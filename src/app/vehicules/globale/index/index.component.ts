import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { VehiculeService } from '../../../_services/vehicule.service';
import { VehiculeGroupeService } from '../../../_services/vehicule-groupe.service';
import { VehiculeMarqueService } from '../../../_services/vehicule-marque.service';
import { EcoconduiteService } from '../../../_services/ecoconduite.service';
import { TokenService } from '../../../_services/token.service';
import { UtilisateurService } from '../../../_services/utilisateur.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  vehicules: any = []; groupes: any = []; marques: any = [];
  search: any = { matricule: null, groupe_id: '', marque_id: '' }
  infosVehicule: any={total_vehicules:null, nombre_GPS:null, total_GPS_active:null, Total_GPS_inactive:null};
  idVehicule = 0; message:any = null; 

  constructor(
    private vehiculeService: VehiculeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private vehiculeGroupeService: VehiculeGroupeService,
    private vehiculeMarqueService: VehiculeMarqueService,
    private ecoconduiteService: EcoconduiteService,
    private tokenService: TokenService,
    private utilisateurService:UtilisateurService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      //01
      const { page } = param;
      if (page) this.getAllVehicule(page);
      //02
      this.getAllGroupes();
      this.getAllMarques();
      //03
      const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
      this.getInfosVehiculeById(payload.id)
    });
  }

  getInfosVehiculeById(id:number){
    this.utilisateurService.getUtilisateur(id).subscribe(
      result =>{
        //this.infosVehicule.nombre_GPS =result.balises_active +'/'+ result.nbre_balises;
        this.infosVehicule.nombre_GPS =result.balises_active;
        this.infosVehicule.total_GPS_active = result.balises_active;
        this.infosVehicule.Total_GPS_inactive = this.vehicules.total_records - result.balises_active;
      },
      async error => {
        if(error.status==401 && await this.refreshToken()) this.getInfosVehiculeById(id);
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

  logout() {
    this.authService.logout();
  }

  searchVehicule(form: any) {
    this.vehiculeService.search(form).subscribe(
      res =>{
        this.vehicules = res;
        const vehicules = this.vehicules['records'];
        vehicules.map(async (v: any) => v.compteur = v.eco_conduite ? (await this.ecoconduiteService.resumeOfVehicule(v.id).toPromise()).compteur_km : v.compteur_initial);
        this.vehicules['records'] = vehicules;
      },
      async error => {
        if (error.status == 401 && await this.refreshToken()) this.searchVehicule(form);
      }
    );
  }

  getAllGroupes() {
    this.vehiculeGroupeService.getAll().subscribe(
      res => this.groupes = res,
      async error => {
        if (error.status == 401 && await this.refreshToken()) this.getAllGroupes();
      }
    );
  }

  getAllMarques() {
    this.vehiculeMarqueService.getAll().subscribe(
      res => this.marques = res,
      async error => {
        if (error.status == 401 && await this.refreshToken()) this.getAllMarques();
      }
    )
  }

  getAllVehicule(page: number) {
    this.vehiculeService.getAllByPage(page).subscribe(res => {
      this.vehicules = res;
      const vehicules = this.vehicules['records'];
      vehicules.map(async (v: any) => v.compteur = v.eco_conduite ? (await this.ecoconduiteService.resumeOfVehicule(v.id).toPromise()).compteur_km : v.compteur_initial);
      this.vehicules['records'] = vehicules;
    })
  }

  // getIdVehicule(id: number) {
  //   this.idVehicule = id;
  // }

  delete(id: number) {
    this.vehiculeService.delete(id).subscribe(res => {
      this.getAllVehicule(1);
      this.message = "Le vehicule est supprimé avec succès !";
      this.closeModal();
    },
    async error => {
        if (error.status == 401 && await this.refreshToken()) this.delete(id);
      })
  }
  
}
