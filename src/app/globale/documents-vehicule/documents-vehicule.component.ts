import { Component, OnInit } from '@angular/core';
import { PaysService } from '../../_services/pays.service';
import { VehiculeDocumentService } from '../../_services/vehicule-document.service';
import { SecuriteClass } from '../../_globale/securite';
import { GlobalFunctions } from '../../_globale/global-functions';

@Component({
  selector: 'app-documents-vehicule',
  templateUrl: './documents-vehicule.component.html',
  styleUrls: ['./documents-vehicule.component.css']
})
export class DocumentsVehiculeComponent implements OnInit {

  constructor(
    private securiteClass: SecuriteClass,
    public globalFunctions:GlobalFunctions,
    private vehiculeDocumentService:VehiculeDocumentService,
    private paysService:PaysService
  ) { }

  pays: any = []; documents: any=[]; message: any=null;
  singleDocument: any = { id:null, nom: null, pays_id: null };

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays() {
     this.paysService.getAll().subscribe(
        result => this.pays = result,
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.getAllPays();
        }
      );
  }

  getDocumentsByPaysId(id: number){
    this.vehiculeDocumentService.getDocumentsByPaysId(id).subscribe(
      result => {
        this.documents=result;
        this.singleDocument.pays_id=id;
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getDocumentsByPaysId(id);
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
          this.globalFunctions.closeModal();
        },
        error => {
          if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
        })
    } else {
      this.vehiculeDocumentService.update(form).subscribe(
        res => {
          this.getDocumentsByPaysId(form.pays_id);
          this.message = "Document vehicule bien modifie !";
          this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      })
    }
  }

  delete(id:any){
    this.message = null;
    this.vehiculeDocumentService.delete(id).subscribe(
      res => {
        this.getDocumentsByPaysId(this.singleDocument.pays_id);
        this.message = "Document vehicule bien Supp !";
        this.globalFunctions.closeModal();
      },
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.delete(id);
      })
  }

  clear(){
    this.message=null;
    this.singleDocument = { id:null, nom: null, pays_id: this.singleDocument.pays_id };
  }

}
