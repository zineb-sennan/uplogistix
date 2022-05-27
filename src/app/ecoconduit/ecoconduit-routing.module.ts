import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { GlobaleComponent } from './analyse-vehicule/globale/globale.component';
import { GlobaleConducteurComponent } from './conducteurs/globale-conducteur/globale-conducteur.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard de l\'eco-conduite'
        },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'analyse-vehicule',
        component: GlobaleComponent,
        canActivate: [AuthGuardUser],
        data: {
          title: 'analyse des véhicules'
        },
      },
      {
        path: 'analyse-conducteur',
        component: GlobaleConducteurComponent,
        canActivate: [AuthGuardUser],
        data: {
          title: 'analyse des conducteurs'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class EcoconduitRoutingModule { }