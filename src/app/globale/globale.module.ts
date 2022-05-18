import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalisationComponent } from './localisation/localisation.component';
import { IdentifiantsFiscaleComponent } from './identifiants-fiscale/identifiants-fiscale.component';
import { GlobaleRoutingModule } from './globale-routing.module';
import { FormsModule } from '@angular/forms';
import { DocumentsVehiculeComponent } from './documents-vehicule/documents-vehicule.component';

@NgModule({
  declarations: [
    LocalisationComponent,
    IdentifiantsFiscaleComponent,
    DocumentsVehiculeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GlobaleRoutingModule,
  ]
})
export class GlobaleModule { }
