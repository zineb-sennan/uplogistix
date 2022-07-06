import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditOrdreInterventionComponent } from './ordre-intervention/edit-ordre-intervention/edit-ordre-intervention.component';
import { IndexOrdreInterventionComponent } from './ordre-intervention/index-ordre-intervention/index-ordre-intervention.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'ordre-intervention',
    component: IndexOrdreInterventionComponent,
    data: { title: 'Liste des order d\'intervention' }
  },
  { 
    path: 'ordre-intervention/edit',
    component: EditOrdreInterventionComponent,
    data: { title: 'Gestion des order d\'intervention' }
  },
  { 
    path: 'ordre-intervention/:id/edit',
    component: EditOrdreInterventionComponent,
    data: { title: 'Gestion des order d\'intervention' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
