import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { PaysService } from '../../_services/pays.service';
import { VehiculeDocumentService } from '../../_services/vehicule-document.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-documents-vehicule',
  templateUrl: './documents-vehicule.component.html',
  styleUrls: ['./documents-vehicule.component.css']
})
export class DocumentsVehiculeComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private vehiculeDocumentService:VehiculeDocumentService,
    private paysService:PaysService
  ) { }

  pays: any = [];
  documents: any=[];
  message: any=null;

  singleDocument: any = { id:null, nom: null, pays_id: null };

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
        error => this.refreshToken()
      );
  }

  getDocumentsByPaysId(id: number){
    this.vehiculeDocumentService.getDocumentsByPaysId(id).subscribe(
      result => {
        this.documents=result;
        this.singleDocument.pays_id=id;
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.getDocumentsByPaysId(id);
      })
  }

  setDocument(doc: any){
    this.message = null;
    this.singleDocument=doc;
  }

  update(form: any){
    this.message = null;
    if (!form.id) {
      this.vehiculeDocumentService.create(form).subscribe(
        res => {
          this.getDocumentsByPaysId(form.pays_id);
          this.message = "Document vehicule bien ajouter !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    } else {
      this.vehiculeDocumentService.update(form).subscribe(
        res => {
          this.getDocumentsByPaysId(form.pays_id);
          this.message = "Document vehicule bien modifie !";
          this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any){
    this.message = null;
    this.vehiculeDocumentService.delete(id).subscribe(
      res => {
        this.getDocumentsByPaysId(this.singleDocument.pays_id);
        this.message = "Document vehicule bien Supp !";
        this.closeModal();
      },
      error => {
        if(error.status==401 && this.refreshToken()) this.delete(id);
      })
  }

  clear(){
    this.message=null;
    this.singleDocument = { id:null, nom: null, pays_id: this.singleDocument.pays_id };
  }

}
