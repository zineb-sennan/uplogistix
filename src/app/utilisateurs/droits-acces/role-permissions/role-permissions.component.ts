import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/_services/roles.service';
import { Location } from '@angular/common';
import { RolePermissionsService } from 'src/app/_services/role-permissions.service';
import { PermissionsService } from 'src/app/_services/permissions.service';
import { AuthService } from 'src/app/_services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.css']
})
export class RolePermissionsComponent implements OnInit {

  role_id = -1;
  singleRole: any = { id: null, libelle: null, description: null }
  rolePermissions: any[] = [];
  singleRolePermission: any = { id:null, role_id: null, permission_id: null, can_edit: null, can_delete: null }
  permissions: any[] = [];

  constructor(
    private rolesService: RolesService,
    private rolePermissionsService: RolePermissionsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private permissionsService: PermissionsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const role_id = param['role_id'];
      this.getRole(role_id);
    });
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

  getRole(id: number) {
    this.rolesService.getRole(id).subscribe(
      res => {
        this.singleRole = res;
        this.getAllPermissions();
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.getRole(id);
      }
    )
  }

  updateRole(form: any) {
    this.rolesService.update(form).subscribe(
      res => {
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.updateRole(form);
      }
    )
  }

  fermer() {
    this.location.back();
  }

  getAllRolePermissions(role_id: number) {
    this.rolePermissionsService.getAllRolePermissions(role_id).subscribe(
      res => {
        this.rolePermissions = res
        this.filterPermissions();
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.getAllRolePermissions(role_id);
      }
    )
  }

  getRolePermission(role_id: number, permission_id: number) {
    this.rolePermissionsService.getRolePermission(role_id, permission_id).subscribe(
      res => this.singleRolePermission = res,
      error => {
        if (error.status == 401 && this.refreshToken()) this.getRolePermission(role_id, permission_id);
      },
    )
  }

  deleteRolePermission(role_id: number, permission_id: number) {
    this.rolePermissionsService.delete(role_id, permission_id).subscribe(
      res => {
        this.getAllRolePermissions(role_id);
        this.getAllPermissions();
        this.closeModal();
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.deleteRolePermission(role_id, permission_id);
      }
    )
  }

  getAllPermissions() {
    this.permissionsService.getAll().subscribe(
      res => {
        this.permissions = res;
        this.getAllRolePermissions(this.singleRole.id);
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.getAllPermissions();
      }
    )
  }


  createRolePermissions(form: any){
    this.rolePermissionsService.create(form).subscribe(
      res => {
        this.getAllRolePermissions(form.role_id);
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.createRolePermissions(form);
      }
    )
  }

  editeRolePermissions(form: any){
    this.rolePermissionsService.update(form).subscribe(
      res => {
        this.getAllRolePermissions(form.role_id);
      },
      error => {
        if (error.status == 401 && this.refreshToken()) this.editeRolePermissions(form);
      }
    )
  
  }

  addRolePermossion() {
    const self = this;
    $(".infos-permission").each(function (index) {
      const rolePermissions = {
        role_id: self.singleRole.id,
        permission_id: Number($(this).attr('id')),
        can_edit: $(".can_edit_" + index).is(":checked"),
        can_delete: $(".can_delete_" + index).is(":checked")
      }
      if (rolePermissions.can_edit || rolePermissions.can_delete || $(".can_consulter_" + index).is(":checked")){
        self.createRolePermissions(rolePermissions);
        console.log(index, rolePermissions);
      } 
    });

    this.closeModal();
  }

  filterPermissions() {
    this.permissions = this.permissions.filter(p => !this.rolePermissions.find(({ permission_id }) => permission_id == p.id));
  }


  canEditChange(values:any, rolePermission:any){
    var rolePermissions = {
      role_id: rolePermission.role_id,
      permission_id: rolePermission.permission_id,
      can_edit: values.currentTarget.checked,
      can_delete: rolePermission.can_delete
    }
    this.editeRolePermissions(rolePermissions);
  }

  canDeleteChange(values:any, rolePermission:any){
    var rolePermissions = {
      role_id: rolePermission.role_id,
      permission_id: rolePermission.permission_id,
      can_edit: rolePermission.can_edit,
      can_delete: values.currentTarget.checked 
    }
    this.editeRolePermissions(rolePermissions);
  }

  checkConsulter(val:any,index:any){
    if(val.currentTarget.checked)
      $(".can_consulter_" + index).prop( "checked", true );
  }

}