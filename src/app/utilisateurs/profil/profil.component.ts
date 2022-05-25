import { Component, OnInit } from '@angular/core';
import { PaysService } from '../../_services/pays.service';
import { RegionsService } from '../../_services/regions.service';
import { TokenService } from '../../_services/token.service';
import { UtilisateurService } from '../../_services/utilisateur.service';
import { VillesService } from '../../_services/villes.service';
import { GlobalFunctions } from '../../_globale/global-functions';
import { SecuriteClass } from '../../_globale/securite';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  pays: any[] = []; regions: any[] = []; villes: any[] = []; message: any = null;
  singleUtilisateur: any = { id: null, type_compte: null, role_id: null, nom: null, prenom: null, cni: null, email: null, tel: null, password: null, adresse: null, ville_id: null, region_id: null, pays_id: null, locked_by: null };

  constructor(
    private securiteClass: SecuriteClass,
    public globalFunctions:GlobalFunctions,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private utilisateurService: UtilisateurService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    this.getUtilisateur(payload.id);
    this.getAllPays();
  }

  getUtilisateur(id: number) {
    this.utilisateurService.getUtilisateur(id).subscribe(
      res => {
        this.singleUtilisateur = res;
        this.getAllPays();
        this.getRegionsByPays(res.pays_id);
        this.getVillesByRegion(res.region_id);
      },
      error => {
        if (error.status == 401 && this.securiteClass.refreshToken()) this.getUtilisateur(id);
      }
    )
  }

  getAllPays() {
    this.paysService.getAll().subscribe(result => this.pays = result);
  }

  getRegionsByPays(id: any) {
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleUtilisateur.pays_id = id;
      },
      error => {
        if (error.status == 401 && this.securiteClass.refreshToken()) this.getRegionsByPays(id);
      }
    );
  }

  getVillesByRegion(id: any) {
    this.villes = [];
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleUtilisateur.region_id = id;
      },
      error => {
        if (error.status == 401 && this.securiteClass.refreshToken()) this.getVillesByRegion(id);
      });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  update(form: any) {
    this.utilisateurService.update(form).subscribe(
      res => this.message = "Votre profile est modifié avec succès !",
      error => {
        if (error.status == 401 && this.securiteClass.refreshToken()) this.update(form);
    })
  }


}
