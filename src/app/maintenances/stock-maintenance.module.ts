import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { MaintenancePreventiveComponent } from './maintenance-preventive/maintenance-preventive.component';
import { DemandeInterventionComponent } from './demande-intervention/demande-intervention.component';
import { GestionReparationsComponent } from './gestion-reparations/gestion-reparations.component';
import { PneumatiqueComponent } from './pneumatique/pneumatique.component';


const routes: Routes = [
  {
    path: '',
    children: [
      /*** les entrepots ***/
      { path: 'maintenance-preventive', component:MaintenancePreventiveComponent, canActivate: [AuthGuardUser] },
      { path: 'demande-intervention', component: DemandeInterventionComponent, canActivate: [AuthGuardUser] },
      { path: 'gestion-reparations', component: GestionReparationsComponent, canActivate: [AuthGuardUser] },
      { path: 'pneumatique', component: PneumatiqueComponent, canActivate: [AuthGuardUser] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MaintenanceRoutingModule { }