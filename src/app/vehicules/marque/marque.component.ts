import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { VehiculeMarqueService } from '../../_services/vehicule-marque.service';

import { environment } from 'src/environments/environment';

import * as $ from 'jquery';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {

  page=null;  search:any=null;  message:any = null;  logo: File | null = null; imageURL='';
  marques: any = []; modeles: any = [];
  singleMarque: any = { id: null, nom: null, description: null };

  constructor(
    private vehiculeMarqueService: VehiculeMarqueService,
    private authService: AuthService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.imageURL=environment.apiURL.replace("api/v1", "images/marques/");
    this.activatedRoute.params.subscribe(param => {
      this.page = param['page'];
      if (this.page) this.searchMarque();
    });
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  async refreshToken() {
    return await this.authService.refresh() ? true : this.logout();
  }

  clear() {
    this.message = null;
    this.singleMarque = { id: null, nom: null, logo: null }
  }

  logout() {
    this.authService.logout();
  }

  // getAllMarques(page:any) {
  //   this.vehiculeMarqueService.getAllByPage(page).subscribe(
  //     result => this.marques = result, 
  //     error => this.refreshToken()
  //   );
  // }

  getMarque(id: number) {
    this.message = null;
    this.logo=null;
    this.vehiculeMarqueService.getMarque(id).subscribe(
      res=> this.singleMarque=res,
      error => {
        if(error.status==401 && this.refreshToken()) this.getMarque(id);
      }
    )
  }


  uploadFile(form: any) {
    const data = new FormData();
    data.append("marque_id", form.id);
    data.append("file", this.logo as Blob);
    this.vehiculeMarqueService.uploadLogo(data).subscribe(
      res => this.searchMarque(),
      error => {
        if(error.status==401 && this.refreshToken()) this.uploadFile(form);
      }
    )
  }

  update(form: any) {
    if (!form.id) {
      this.vehiculeMarqueService.create(form).subscribe(
        res => {
          form.id = res.id;
          if (this.logo) this.uploadFile(form);
          else this.searchMarque();
          this.message = "La marque est ajoutée avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    } else {
      this.vehiculeMarqueService.update(form).subscribe(
        res => {
          if (this.logo) this.uploadFile(form);
          else this.searchMarque();
          this.message = "La marque est modifiée avec succès !";
          this.closeModal();
        },
        error => {
          if(error.status==401 && this.refreshToken()) this.update(form);
        })
    }
  }

  delete(id: any) {
    this.vehiculeMarqueService.delete(id).subscribe(res => {
      this.searchMarque();
      this.message = "La marque est supprimée avec succès !";
      this.closeModal();
    },
    error => {
      if(error.status==401 && this.refreshToken()) this.delete(id);
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.logo = event.target.files[0];
      };
    }
  }

  onMouseMarque(id:number){
    this.singleMarque.id=id;
  }

  searchMarque(page?:any){
    if(page) this.page=page;

    this.vehiculeMarqueService.search({nom: this.search},this.page).subscribe(
      res=>this.marques = res,
      error => {
        if(error.status==401 && this.refreshToken()) this.searchMarque();
      }
    );
  }

}