import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleComponent } from './globale/globale.component';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { FormsModule } from '@angular/forms';
import { ChangementPwdComponent } from './changement-pwd/changement-pwd.component';
import { RolesComponent } from './droits-acces/roles/roles.component';
import { RolePermissionsComponent } from './droits-acces/role-permissions/role-permissions.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    GlobaleComponent,
    ChangementPwdComponent,
    RolesComponent,
    RolePermissionsComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    FormsModule
  ]
})
export class UtilisateursModule { }
