import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenancePreventiveComponent } from './maintenance-preventive/maintenance-preventive.component';
import { DemandeInterventionComponent } from './demande-intervention/demande-intervention.component';
import { GestionReparationsComponent } from './gestion-reparations/gestion-reparations.component';
import { PneumatiqueComponent } from './pneumatique/pneumatique.component';
import { MaintenanceRoutingModule } from './stock-maintenance.module';



@NgModule({
  declarations: [
    MaintenancePreventiveComponent,
    DemandeInterventionComponent,
    GestionReparationsComponent,
    PneumatiqueComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenancesModule { }
