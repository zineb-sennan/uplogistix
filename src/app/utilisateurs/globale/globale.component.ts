import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { PaysService } from '../../_services/pays.service';
import { RegionsService } from '../../_services/regions.service';
import { UtilisateurService } from '../../_services/utilisateur.service';
import { VillesService } from '../../_services/villes.service';
import { RolesService } from '../../_services/roles.service';
import { TokenService } from '../../_services/token.service';
import { SecuriteClass } from '../../_globale/securite';
import { Globale } from '../../_globale/globale';

@Component({
  selector: 'app-globale',
  templateUrl: './globale.component.html',
  styleUrls: ['./globale.component.css']
})
export class GlobaleComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    public globale:Globale,
    private utilisateurService:UtilisateurService,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private rolesService:RolesService,
    private tokenService: TokenService
  ) { }

  message:any=null; roles: any[] = [];
  utilisateurs: any=[]; pays: any[] = []; regions: any[] = []; villes: any[] = [];
  singleUtilisateur: any = { id:null,type_compte:null, role_id:null, nom: null, prenom:null, cni:null, email:null, tel:null, password:null, adresse:null, ville_id:null, region_id:null, pays_id: null,locked_by:null };

  ngOnInit(): void {
    this.getAllUtilisateurs();
    this.getAllPays();
    this.getAllRoles();
  }

  clear(){
    this.singleUtilisateur={ id:null, type_compte:null, role_id:null, nom: null, prenom:null, cni:null, email:null, tel:null, password:null, adresse:null, ville_id:null, region_id:null, pays_id: null,locked_by:null };
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllPays();
      }
    );
  }

  getAllRoles(){
    this.rolesService.getAll().subscribe(
      res=> this.roles=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllRoles();
      }
    )
  }

  getRegionsByPays(id: any) {
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleUtilisateur.pays_id = id;
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getRegionsByPays(id);
    });
  }

  getVillesByRegion(id: any) {
    this.villes = [];
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleUtilisateur.region_id = id;
    },
    error => {
      if(error.status==401 && this.securiteClass.refreshToken()) this.getVillesByRegion(id);
    });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  getAllUtilisateurs(){
    this.utilisateurService.getAll().subscribe(
      result =>{
        const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
        this.utilisateurs = result.filter((u:any)=>u.id!=payload.id);
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllUtilisateurs();
      }
    );
  }

  getUtilisateur(id:number){
    this.message = null;
    this.utilisateurService.getUtilisateur(id).subscribe(
      res=>{
        this.singleUtilisateur=res;
        this.getRegionsByPays(res.pays_id);
        this.getVillesByRegion(res.region_id);
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllUtilisateurs();
      }
    )
  }

  update(form: any){
    if (!form.id) {
      this.utilisateurService.create(form).subscribe(
        res => {
          this.getAllUtilisateurs();
          this.message = "L'utilisateur est ajouté avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    } else {
      this.utilisateurService.update(form).subscribe(
        res => {
          this.getAllUtilisateurs();
          this.message = "L'utilisateur est modifié avec succès !";
          this.globale.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  lock(){
    let state=true;
    if(this.singleUtilisateur.locked_by) state=false;
    this.utilisateurService.lock(state,this.singleUtilisateur.id).subscribe(
      res=>{
        this.getAllUtilisateurs();
        this.message="L'utilisateur est bloqué avec succès !";
        if(this.singleUtilisateur.locked_by) this.message="L'utilisateur est débloqué avec succès !";
        this.globale.closeModal();
      },
      error => {
       if(error.status==401 && this.securiteClass.refreshToken()) this.lock();
    });
  }

}
