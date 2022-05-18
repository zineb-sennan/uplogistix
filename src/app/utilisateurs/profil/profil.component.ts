import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { PaysService } from 'src/app/_services/pays.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { TokenService } from 'src/app/_services/token.service';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { VillesService } from 'src/app/_services/villes.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  pays: any[] = []; regions: any[] = []; villes: any[] = []; message: any = null;
  singleUtilisateur: any = { id: null, type_compte: null, role_id: null, nom: null, prenom: null, cni: null, email: null, tel: null, password: null, adresse: null, ville_id: null, region_id: null, pays_id: null, locked_by: null };

  constructor(
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private utilisateurService: UtilisateurService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const payload = this.tokenService.payload(this.tokenService.getToken() ?? '');
    this.getUtilisateur(payload.id);
    this.getAllPays();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout() {
    this.authService.logout();
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
        if (error.status == 401 && this.refreshToken()) this.getUtilisateur(id);
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
        if (error.status == 401 && this.refreshToken()) this.getRegionsByPays(id);
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
        if (error.status == 401 && this.refreshToken()) this.getVillesByRegion(id);
      });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  update(form: any) {
    console.log("*** update ***");
    this.utilisateurService.update(form).subscribe(
      res => this.message = "Votre profile est modifié avec succès !",
      error => {
        if (error.status == 401 && this.refreshToken()) this.update(form);
    })
  }


}
