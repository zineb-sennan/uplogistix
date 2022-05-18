import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentifiantsFiscaleComponent } from './identifiants-fiscale/identifiants-fiscale.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { DocumentsVehiculeComponent } from './documents-vehicule/documents-vehicule.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'localisations',
        component: LocalisationComponent,
        data: {
          title: 'Gestion des pays & regions & villes'
        },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'identifiants-fiscale',
        component: IdentifiantsFiscaleComponent,
        data: {
          title: 'Gestion des identifiants fiscale'
        },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'documents-vehicule',
        component: DocumentsVehiculeComponent,
        data: {
          title: 'Gestion des document vehicule'
        },
        canActivate: [AuthGuardAdmin]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class GlobaleRoutingModule { }