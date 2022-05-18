import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { IdFiscaleService } from '../../_services/id-fiscale.service';
import { PaysService } from '../../_services/pays.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-identifiants-fiscale',
  templateUrl: './identifiants-fiscale.component.html',
  styleUrls: ['./identifiants-fiscale.component.css']
})
export class IdentifiantsFiscaleComponent implements OnInit {
  pays: any[] = [];
  fiscaux: any[] = [];

  singleFisc: any = { id:null, nom: null, pays_id: null };

  message:any = null;

  constructor(
    private paysService: PaysService,
    private idFiscaleService:IdFiscaleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllPays();
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

  getAllPays() {
    this.paysService.getAll().subscribe(
      result => this.pays = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getAllPays();
      });
  }

  getIdFiscaleByPays(id:number){
    this.idFiscaleService.identifiantsByPays(id).subscribe(
      result => this.fiscaux = result,
      error => {
        if(error.status==401 && this.refreshToken()) this.getIdFiscaleByPays(id);
      });
    this.singleFisc.pays_id=id;
  }

  setIdFiscale(data: any){
    this.message=null;
    this.singleFisc = data;
  }


  update(form: any){
    if (!form.id) {
      this.idFiscaleService.create(form).subscribe(
        res => {
          this.getIdFiscaleByPays(form.pays_id);
          this.message = "L'identifiant fiscal est ajouté avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    } else {
      this.idFiscaleService.update(form).subscribe(
        res => {
          this.getIdFiscaleByPays(form.pays_id);
          this.message = "L'identifiant fiscal est modifie avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    }
  }

  delete(id:number){
      this.idFiscaleService.delete(id).subscribe(
        res => {
          this.getIdFiscaleByPays(this.singleFisc.pays_id);
          this.message = "L'identifiant fiscal est supprimé avec succès !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  clear(){
    this.singleFisc = { id:null, nom: null, pays_id: this.singleFisc.pays_id };
  }


}
