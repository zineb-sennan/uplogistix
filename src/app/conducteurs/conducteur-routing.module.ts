import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobaleComponent } from './globale/globale.component';
import { AuthGuardUser } from '../_helpers/auth-guard-user';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page/:page',
        component: GlobaleComponent,
        canActivate: [AuthGuardUser],
        data: {
          title: 'Gestion des conducteurs'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ConducteurRoutingModule { }