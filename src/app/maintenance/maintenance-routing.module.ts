import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './dashboard/details/details.component';
import { IndexComponent } from './dashboard/index/index.component';
import { EditOrdreInterventionComponent } from './ordre-intervention/edit-ordre-intervention/edit-ordre-intervention.component';
import { IndexOrdreInterventionComponent } from './ordre-intervention/index-ordre-intervention/index-ordre-intervention.component';
import { TiersComponent } from './tiers/tiers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: IndexComponent,
  },
  {
    path: 'dashboard/:id/details',
    component: DetailsComponent,
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
  { 
    path: 'ordre-intervention/:id/add',
    component: EditOrdreInterventionComponent,
    data: { title: 'ajouter-maintenance-order' }
  },
  { 
    path: 'tiers',
    component: TiersComponent,
    data: { title: 'Gestion des tiers' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
