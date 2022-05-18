import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../_services/roles.service';
import { AuthService } from '../../../_services/auth.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: any[] = [];
  message: string = '';
  singleRole: any= { id: null, libelle:null, description:null }

  constructor(
    private rolesService:RolesService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  closeModal() {
    $('.modal').hide();
    $('.modal-backdrop').remove();
    $('body').removeAttr("style");
  }

  getAllRoles(){
    this.rolesService.getAll().subscribe(
      res=> this.roles=res
    )
  }

  update(form:any){
    this.rolesService.create(form).subscribe(
      res=>{
        this.getAllRoles();
        this.message="Le rôle est ajouté avec succès !";
        this.closeModal();
      },
      error=>{
       //if(error.status==401 && this.refreshToken()) this.updateContact(form);
      }
    )
  }

  delete(){
    this.rolesService.delete(this.singleRole.id).subscribe(
      res=>{
        this.getAllRoles();
        this.message="Le rôle est supprimé avec succès !";
        this.closeModal();
      },
      error=>{
       //if(error.status==401 && this.refreshToken()) this.updateContact(form);
      }
    )
  }

  getRole(id:number){
    this.message='';
    this.rolesService.getRole(id).subscribe(
      res=>this.singleRole=res,
      error=>{
        //if(error.status==401 && this.refreshToken()) this.updateContact(form);
      }
    )
  }

  clear(){
    this.singleRole= { id: null, libelle:null, description:null };
  }

}
