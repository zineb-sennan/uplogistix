import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../_services/roles.service';
import { SecuriteClass } from '../../../_globale/securite';
import { Globale } from '../../../_globale/globale';


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
    private securiteClass: SecuriteClass,
    public globale:Globale,
    private rolesService:RolesService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.rolesService.getAll().subscribe(
      res=> this.roles=res,
      error => {
        if(error.status==401 && this.securiteClass.refreshToken()) this.getAllRoles();
      }
    )
  }

  update(form:any){
    this.rolesService.create(form).subscribe(
      res=>{
        this.getAllRoles();
        this.message="Le rôle est ajouté avec succès !";
        this.globale.closeModal();
      },
      error=>{
       if(error.status==401 && this.securiteClass.refreshToken()) this.update(form);
      }
    )
  }

  delete(){
    this.rolesService.delete(this.singleRole.id).subscribe(
      res=>{
        this.getAllRoles();
        this.message="Le rôle est supprimé avec succès !";
        this.globale.closeModal();
      },
      error=>{
        if(error.status==401 && this.securiteClass.refreshToken()) this.delete();
      }
    )
  }

  getRole(id:number){
    this.message='';
    this.rolesService.getRole(id).subscribe(
      res=>this.singleRole=res,
      error=>{
        if(error.status==401 && this.securiteClass.refreshToken()) this.getRole(id);
      }
    )
  }

  clear(){
    this.singleRole= { id: null, libelle:null, description:null };
  }

}
