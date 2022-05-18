import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DernierePositionGroupeComponent } from './derniere-position-groupe/derniere-position-groupe.component';
import { DernierePositionComponent } from './derniere-position/derniere-position.component';
import { GeozoneEditComponent } from './geozone-edit/geozone-edit.component';
import { GeozonesComponent } from './geozones/geozones.component';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  {
    path: 'derniere-position',
    component: DernierePositionComponent,
  },
  {
    path: 'derniere-position-groupe',
    component: DernierePositionGroupeComponent,
  },
  {
    path: 'historique',
    component: HistoriqueComponent,
  },
  {
    path: 'geozones',
    component: GeozonesComponent,
  },
  {
    path: 'geozones/create',
    component: GeozoneEditComponent,
  },
  {
    path: 'geozones/:id/edit',
    component: GeozoneEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeolocalisationRoutingModule { }
