import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocalisationRoutingModule } from './geolocalisation-routing.module';
import { DernierePositionComponent } from './derniere-position/derniere-position.component';
import { HistoriqueComponent } from './historique/historique.component';
import { FormsModule } from '@angular/forms';
import { GeozonesComponent } from './geozones/geozones.component';
import { GeozoneEditComponent } from './geozone-edit/geozone-edit.component';
import { DernierePositionGroupeComponent } from './derniere-position-groupe/derniere-position-groupe.component';


@NgModule({
  declarations: [
    DernierePositionComponent,
    DernierePositionGroupeComponent,
    HistoriqueComponent,
    GeozonesComponent,
    GeozoneEditComponent
  ],
  imports: [
    CommonModule,
    GeolocalisationRoutingModule,
    FormsModule
  ]
})
export class GeolocalisationModule { }
