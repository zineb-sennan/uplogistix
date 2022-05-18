import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../_services/client.service';
import { IdFiscaleService } from '../../../_services/id-fiscale.service';
import { PaysService } from '../../../_services/pays.service';
import { RegionsService } from '../../../_services/regions.service';
import { VillesService } from '../../../_services/villes.service';
import { AuthService } from '../../../_services/auth.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as $ from 'jquery';


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
  contacts:any[] = [];

  singleClient: any = { id: null, raison_sociale: null, adresse: null, nom: null, prenom: null, pays_id: null, region_id: null, ville_id: null, email: null, tel_mobile: null, tel_bureau: null, fax: null };
  singleContact: any= { id: null, client_id:null, titre:null, fonction:null, prenom:null, nom:null, email:null, tel_mobile:null, tel_bureau:null, fax:null }

  message: any = null;
  type: string = "client";

  constructor(
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private clientService: ClientService,
    private idFiscaleService: IdFiscaleService,
    private activatedRoute: ActivatedRoute,
    private location:Location,
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this. getInfosClientById(id);
    });

    this.getAllPays();
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  logout() {
    this.authService.logout();
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  fermer(){
    this.location.back();
  }

  changeType(type: any) {
    this.message=null;
    this.type = type;
  }

  clear() {
    this.singleClient = { id: null, raison_sociale: null, adresse: null, pays_id: null, region_id: null, ville_id:null, nom: null, prenom: null, email: null, tel_mobile: null, tel_bureau: null, fax: null, password: null, nbre_vehicules:null };
  }

  getInfosClientById(id: any) {
    this.clientService.getClient(id).subscribe(result => {
      this.singleClient = result;
      this.getRegionsByPays(this.singleClient.pays_id);
      this.getVillesByRegion(this.singleClient.region_id);
      this.getIdentifiantsByClient(id);
      this.getContcatsByClientId(id);
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.getInfosClientById(id);
    }
    );
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllPays();
      });
  }

  getRegionsByPays(id: any) {
    this.regions = [];
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleClient.pays_id = id;
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.getRegionsByPays(id);
      });
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleClient.region_id = id;
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.getVillesByRegion(id);
    });
  }

  changePays(e: any) {
    this.getRegionsByPays(e.target.value);
  }

  changeRegion(e: any) {
    this.getVillesByRegion(e.target.value);
  }

  getIdentifiantsByClient(id: number) {
    this.idFiscaleService.identifiantsByClient(id).subscribe(
      result => this.fiscaux = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getIdentifiantsByClient(id);
      });
  }

  updateIdentifiantsClient(record: any) {
    this.idFiscaleService.updateIdentifiantsClient(record).subscribe(
      res=> console.log(),
      error => {
        if(error.status==401 && this.refreshToken()) this.updateIdentifiantsClient(record);
      }
    )
  }

  update(form: any) {
    if(form.tel_mobile.indexOf(0)==0 && form.tel_mobile.length >= 9){
      if (!form.id) {
        this.clientService.create(form).subscribe(
          res => {
            this. getInfosClientById(res.id);
            this.message = "Le client est ajouté avec succès !";
            this.type="identifiants_fiscaux";
            $('#error_tel_mobile').text('');
            $('#error_email').text('');
          },
          error => {
            if(error.status==401 && this.refreshToken()) this.update(form);
            else if(error.status==409){
              //tel mobile
              if(error.error.tel_double)  $('#error_tel_mobile').text("Le téléphone mobile est déjà existé, veuillez taper nouveau téléphone mobile !"); 
              else $('#error_tel_mobile').text('');
              //email
              if(error.error.email_doubles) $('#error_email').text("l'adresse email est déjà existé, veuillez taper nouveau adresse email !");
              else $('#error_email').text('');
            }
          }
        )
      }
      else {
        this.clientService.update(form).subscribe(res => {
          this.message = "Le client est modifié avec succès !";
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
      }
    }
    else{
      $('#error_tel_mobile').text("Le téléphone mobile doit être commencer par 0 et contient aux minimaux 9 chiffres !");
    }
  }

  clearContact(){
    this.message=null;
    this.singleContact = { id: null, client_id:null, titre:null, fonction:null, prenom:null, nom:null, email:null, tel_mobile:'', tel_bureau:'', fax:'' }
  }

  getContcatsByClientId(id:number){
    this.clientService.getContactByClientId(id).subscribe(
      res=>this.contacts=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getContcatsByClientId(id);
      }
    )
  }

  updateContact(form:any){
    if(!form.id){
      this.clientService.createContact(form).subscribe(res=>{
        this.getContcatsByClientId(this.singleClient.id);
        this.message="Le contact est ajouté avec succès !";
        this.closeModal();
      },
      error=>{
        if(error.status==401 && this.refreshToken()) this.updateContact(form);
      })
    }
    else{
      this.clientService.updateContact(form).subscribe(
        res=>{
          this.getContcatsByClientId(this.singleClient.id);
          this.message="Le contact est modifié avec succès !";
          this.closeModal();
        },
        error=>{
          if(error.status==401 && this.refreshToken()) this.updateContact(form);
        })
    }
  }

  deleteContact(id: any){
    this.clientService.deleteContact(id).subscribe(
      res=>{
        this.getContcatsByClientId(this.singleClient.id);
        this.message="Le contact est supprimé avec succès !";
        this.closeModal();
    },
    error=>{
      if(error.status==401 && this.refreshToken()) this.deleteContact(id);
    })
  }

  setContact(data: any){
    this.message=null;
    this.singleContact = data;
  }

  upadateIdentifiantsFiscaux(){
    this.fiscaux.forEach(element => {
      this.updateIdentifiantsClient(element);
    });
    this.message = "Les identifiants fiscaux sont ajoutés avec succès !";
  }

}
