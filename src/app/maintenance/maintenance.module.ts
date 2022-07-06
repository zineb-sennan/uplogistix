import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { IndexOrdreInterventionComponent } from './ordre-intervention/index-ordre-intervention/index-ordre-intervention.component';
import { EditOrdreInterventionComponent } from './ordre-intervention/edit-ordre-intervention/edit-ordre-intervention.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    IndexOrdreInterventionComponent,
    EditOrdreInterventionComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    NgCircleProgressModule.forRoot(),
    FormsModule
  ]
})
export class MaintenanceModule { }
