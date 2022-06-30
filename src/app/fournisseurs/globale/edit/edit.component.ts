import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../../../_services/client.service';
import { IdFiscaleService } from '../../../_services/id-fiscale.service';
import { PaysService } from '../../../_services/pays.service';
import { RegionsService } from '../../../_services/regions.service';
import { VillesService } from '../../../_services/villes.service';
import { SecuriteClass } from '../../../_globale/securite';
import { Globale } from '../../../_globale/globale';
import * as $ from 'jquery';
import { FournisseursService } from 'src/app/_services/fournisseurs.service';



@Component({
  selector: 'app-edit-client',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pays: any[] = [];
  regions: any[] = [];
  villes: any[] = [];
  fiscaux: any[] = [];
  contacts: any[] = [];

  singleFournisseur: any = { id: null, raison_sociale: null, adresse: null, pays_id: null, region_id: null, ville_id: null, email: null, tel: null, fax: null, nbre_balises: null };
  singleContact: any = { id: null, client_id: null, titre: null, fonction: null, prenom: null, nom: null, email: null, tel_mobile: null, tel_bureau: null, fax: null }

  message: any = "";
  type: string = "fournisseur";

  constructor(
    private securiteClass: SecuriteClass,
    public globale: Globale,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private fournisseursService: FournisseursService,
    private idFiscaleService: IdFiscaleService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this.getInfosFournisseurById(id);
    });
    this.getAllPays();
  }


  fermer() {
    this.location.back();
  }

  changeType(type: any) {
    this.message = null;
    this.type = type;
  }

  clear() {
    this.singleFournisseur = { id: null, raison_sociale: null, adresse: null, nom: null, prenom: null, pays_id: null, region_id: null, ville_id: null, email: null, tel_mobile: null, tel_bureau: null, fax: null, nbre_balises: null };
  }

  getInfosFournisseurById(id: any) {
    this.fournisseursService.getFournisseur(id).subscribe(result => {
      this.singleFournisseur = result;
      this.getRegionsByPays(this.singleFournisseur.pays_id);
      this.getVillesByRegion(this.singleFournisseur.region_id);

      this.getIdentifiantsByFournisseur(id);
      this.getContcatsByFournisseurId(id);
    },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getInfosFournisseurById(id);
      });
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getAllPays();
      });
  }

  getRegionsByPays(id: any) {
    this.regions = [];
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleFournisseur.pays_id = id;
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getRegionsByPays(id);
      });
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleFournisseur.region_id = id;
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getVillesByRegion(id);
      });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  getIdentifiantsByFournisseur(id: number) {
    this.idFiscaleService.identifiantsByFournisseur(id).subscribe(
      result => this.fiscaux = result,
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getIdentifiantsByFournisseur(id);
      });
  }

  updateIdentifiantsFournisseur(record: any) {
    this.idFiscaleService.updateIdentifiantsFournisseur(record).subscribe(
      res => console.log(),
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.updateIdentifiantsFournisseur(record);
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.fournisseursService.create(form).subscribe(
        res => {
          this.getInfosFournisseurById(res.id);
          this.message = "Le fournisseur est ajouté avec succès .";
          this.type = "identifiants_fiscaux";
        },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.update(form);
        }
      )
    }
    else {
      this.fournisseursService.update(form).subscribe(res => {
        this.message = "Le fournisseur est modifié avec succès !";
      },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.update(form);
        })
    }
  }

  clearContact() {
    this.message = null;
    this.singleContact = { id: null, client_id: null, titre: null, fonction: null, prenom: null, nom: null, email: null, tel_mobile: '', tel_bureau: '', fax: '' }
  }

  getContcatsByFournisseurId(id: number) {
    this.fournisseursService.getContactByFournisseurId(id).subscribe(
      res => this.contacts = res,
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.getContcatsByFournisseurId(id);
      }
    )
  }

  updateContact(form: any) {
    if (!form.id) {
      this.fournisseursService.createContact(form).subscribe(res => {
        this.getContcatsByFournisseurId(this.singleFournisseur.id);
        this.message = "Le contact est ajouté avec succès !";
        this.globale.closeModal();
      },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.updateContact(form);
        })
    }
    else {
      this.fournisseursService.updateContact(form).subscribe(
        res => {
          this.getContcatsByFournisseurId(this.singleFournisseur.id);
          this.message = "Le contact est modifié avec succès !";
          this.globale.closeModal();
        },
        async error => {
          if (error.status == 401 && await this.securiteClass.refreshToken()) this.updateContact(form);
        })
    }
  }

  deleteContact(id: any) {
    this.fournisseursService.deleteContact(id).subscribe(
      res => {
        this.getContcatsByFournisseurId(this.singleFournisseur.id);
        this.message = "Le contact est supprimé avec succès !";
        this.globale.closeModal();
      },
      async error => {
        if (error.status == 401 && await this.securiteClass.refreshToken()) this.deleteContact(id);
      })
  }

  setContact(data: any) {
    this.message = null;
    this.singleContact = data;
  }

  upadateIdentifiantsFiscaux() {
    this.fiscaux.forEach(element => {
      this.updateIdentifiantsFournisseur(element);
    });
    this.message = "Les identifiants fiscaux sont ajoutés avec succès !";
  }

}
