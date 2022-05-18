import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth-guard';
import { GlobaleComponent } from './globale/globale.component';
import { ChangementPwdComponent } from './changement-pwd/changement-pwd.component';
import { RolesComponent } from './droits-acces/roles/roles.component';
import { RolePermissionsComponent } from './droits-acces/role-permissions/role-permissions.component';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GlobaleComponent,
        canActivate: [AuthGuard],
        data: { title: 'Gestion des utilisateurs' }
      },
      {
        path: 'profile',
        component: ProfilComponent,
        canActivate: [AuthGuard],
        data: { title: 'Profile de l\'utilisateurs' }
      },
      {
        path: 'changement-pwd',
        component: ChangementPwdComponent,
        canActivate: [AuthGuard],
        data: { title: 'Changement de mot de passe' }
      },
      {
        path: 'droits-acces',
        component: RolesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Les droits-acces' }
      },
      {
        path: 'droits-acces/roles/:role_id/permissions',
        component: RolePermissionsComponent,
        canActivate: [AuthGuard],
        data: { title: 'role-permissions' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UtilisateurRoutingModule { }