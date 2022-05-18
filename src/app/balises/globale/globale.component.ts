import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { BaliseService } from '../../_services/balise.service';
import { ClientService } from '../../_services/client.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-globale',
  templateUrl: './globale.component.html',
  styleUrls: ['./globale.component.css']
})
export class GlobaleComponent implements OnInit {

  message:any=null;
  balises: any = []; vehicules: any = []; clients: any = [];
  singleBalise: any = { id:null ,imei: null, marque:null, modele:null, sn:null, firmware:null, date_achat:null, date_mise_service:null, eco_conduite:false, vehicule_id:null, client_id:null};
  
  constructor(
    private authService:AuthService,
    private baliseService:BaliseService,
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
    this.getAllBalise();
    this.getAllClients();
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

  getAllClients(){
    this.clientService.getAllClients().subscribe(
      res=> this.clients=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllClients();
    })
  }

  changeClient(e:any){
    this.getVehiculesByClientWithoutGPS(e.target.value);
  }

  getAllBalise() {
    this.baliseService.getAll().subscribe(
      result => this.balises = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllBalise();
      });
  }

  getBalise(id:number){
    this.message=null;
    this.baliseService.getBalise(id).subscribe(
      res=> {
        //this.vehicules=[];
        this.singleBalise=res;
        this.singleBalise._client_id=res.client_id;
        if(res.client_id) this.getVehiculesByClientWithoutGPS(res.client_id);
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.getBalise(id);
      })
  }

  update(form: any) {
    if (!form.id) {
      this.baliseService.create(form).subscribe(res => {
        this.getAllBalise();
        this.message = "La balise est ajoutée avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    } else {
      this.baliseService.update(form).subscribe(res => {
        this.getAllBalise();
        this.message = "La balise est modifiée avec succès !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any) {
    this.baliseService.delete(id).subscribe(res => {
      this.getAllBalise();
      this.message = "La balise est supprimée avec succès !";
      this.closeModal();
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.delete(id);
    })
  }

  clear() {
    this.vehicules=[];
    this.message=null;
    this.singleBalise = { id:null ,imei: null, marque:null, modele:null, sn:null, firmware:null, date_achat:null, date_mise_service:null, eco_conduite:false, vehicule_id:null, client_id:null }
  }

  getVehiculesByClientWithoutGPS(id:number){
    this.clientService.getVehiculesByClientWithoutGPS(id).subscribe(
      res=> {
        this.vehicules=res;
        if(this.singleBalise._client_id==id) this.vehicules.push({id:this.singleBalise.vehicule_id, matricule:this.singleBalise.matricule, marque:this.singleBalise.marque});
        
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      }
    )
  }

}
