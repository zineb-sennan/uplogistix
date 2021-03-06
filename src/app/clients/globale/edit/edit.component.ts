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

  singleClient: any = { id: null, raison_sociale: null, adresse: null, nom: null, prenom: null, pays_id: null, region_id: null, ville_id: null, email: null, tel_mobile: null, tel_bureau: null, fax: null, nbre_balises:null };
  singleContact: any= { id: null, client_id:null, titre:null, fonction:null, prenom:null, nom:null, email:null, tel_mobile:null, tel_bureau:null, fax:null }

  message: any = null;
  type: string = "client";

  constructor(
    private securiteClass: SecuriteClass,
    public globale:Globale,
    private paysService: PaysService,
    private regionsService: RegionsService,
    private villesService: VillesService,
    private clientService: ClientService,
    private idFiscaleService: IdFiscaleService,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const { id } = param;
      if (id) this.getInfosClientById(id);
    });
    this.getAllPays();
  }


  fermer(){
    this.location.back();
  }

  changeType(type: any) {
    this.message=null;
    this.type = type;
  }

  clear() {
    this.singleClient = { id: null, raison_sociale: null, adresse: null, nom: null, prenom: null, pays_id: null, region_id: null, ville_id: null, email: null, tel_mobile: null, tel_bureau: null, fax: null, nbre_balises:null };
  }

  getInfosClientById(id: any) {
    this.clientService.getClient(id).subscribe(result => {
      this.singleClient = result;
      this.getRegionsByPays(this.singleClient.pays_id);
      this.getVillesByRegion(this.singleClient.region_id);
      this.getIdentifiantsByClient(id);
      this.getContcatsByClientId(id);
    },
    async error => {
      if(error.status==401 && await this.securiteClass.refreshToken()) this.getInfosClientById(id);
    });
  }

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getAllPays();
      });
  }

  getRegionsByPays(id: any) {
    this.regions = [];
    this.regionsService.regionsByPays(id).subscribe(
      result => {
        this.regions = result;
        this.singleClient.pays_id = id;
      },
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getRegionsByPays(id);
      });
  }

  getVillesByRegion(id: any) {
    this.villesService.villesByRegion(id).subscribe(
      result => {
        this.villes = result;
        this.singleClient.region_id = id;
    },
    async error => {
      if(error.status==401 && await this.securiteClass.refreshToken()) this.getVillesByRegion(id);
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
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getIdentifiantsByClient(id);
      });
  }

  updateIdentifiantsClient(record: any) {
    this.idFiscaleService.updateIdentifiantsClient(record).subscribe(
      res=> console.log(),
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.updateIdentifiantsClient(record);
      }
    )
  }

  update(form: any) {
    if(form.tel_mobile.indexOf(0)==0 && form.tel_mobile.length >= 9){
      if (!form.id) {
        this.clientService.create(form).subscribe(
          res => {
            this. getInfosClientById(res.id);
            this.message = "Le client est ajout?? avec succ??s !";
            this.type="identifiants_fiscaux";
            $('#error_tel_mobile').text('');
            $('#error_email').text('');
          },
          async error => {
            if(error.status==401 && await this.securiteClass.refreshToken()) this.update(form);
            else if(error.status==409){
              //tel mobile
              if(error.error.tel_double)  $('#error_tel_mobile').text("Ce t??l??phone mobile est d??j?? exist??."); 
              else $('#error_tel_mobile').text('');
              //email
              if(error.error.email_doubles) $('#error_email').text("Cette adresse e-mail est d??j?? exist??e.");
              else $('#error_email').text('');
            }
          }
        )
      }
      else {
        this.clientService.update(form).subscribe(res => {
          this.message = "Le client est modifi?? avec succ??s !";
        },
        async error => {
          if(error.status==401 && await this.securiteClass.refreshToken()) this.update(form);
        })
      }
    }
    else{
      $('#error_tel_mobile').text("Le t??l??phone mobile doit ??tre commencer par 0 et contient aux minimaux 9 chiffres !");
    }
  }

  clearContact(){
    this.message=null;
    this.singleContact = { id: null, client_id:null, titre:null, fonction:null, prenom:null, nom:null, email:null, tel_mobile:'', tel_bureau:'', fax:'' }
  }

  getContcatsByClientId(id:number){
    this.clientService.getContactByClientId(id).subscribe(
      res=>this.contacts=res,
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.getContcatsByClientId(id);
      }
    )
  }

  updateContact(form:any){
    if(!form.id){
      this.clientService.createContact(form).subscribe(res=>{
        this.getContcatsByClientId(this.singleClient.id);
        this.message="Le contact est ajout?? avec succ??s !";
        this.globale.closeModal();
      },
      async error => {
        if(error.status==401 && await this.securiteClass.refreshToken()) this.updateContact(form);
      })
    }
    else{
      this.clientService.updateContact(form).subscribe(
        res=>{
          this.getContcatsByClientId(this.singleClient.id);
          this.message="Le contact est modifi?? avec succ??s !";
          this.globale.closeModal();
        },
        async error => {
          if(error.status==401 && await this.securiteClass.refreshToken()) this.updateContact(form);
        })
    }
  }

  deleteContact(id: any){
    this.clientService.deleteContact(id).subscribe(
      res=>{
        this.getContcatsByClientId(this.singleClient.id);
        this.message="Le contact est supprim?? avec succ??s !";
        this.globale.closeModal();
      },
      async error=>{
        if(error.status==401 && await this.securiteClass.refreshToken()) this.deleteContact(id);
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
    this.message = "Les identifiants fiscaux sont ajout??s avec succ??s !";
  }

}
