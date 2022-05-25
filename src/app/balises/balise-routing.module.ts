import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { GlobaleComponent } from './globale/globale.component';
import { InformationsComponent } from './informations/informations.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GlobaleComponent,
        data: { title: 'Gestion des balises' },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'informations',
        component: InformationsComponent,
        data: { title: 'informations des balises' },
        canActivate: [AuthGuardUser]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class BaliseRoutingModule { }