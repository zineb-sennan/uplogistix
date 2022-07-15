import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { IndexOrdreInterventionComponent } from './ordre-intervention/index-ordre-intervention/index-ordre-intervention.component';
import { EditOrdreInterventionComponent } from './ordre-intervention/edit-ordre-intervention/edit-ordre-intervention.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';
import { TiersComponent } from './tiers/tiers.component';
import { IndexComponent } from './dashboard/index/index.component';
import { DetailsComponent } from './dashboard/details/details.component';


@NgModule({
  declarations: [
    IndexOrdreInterventionComponent,
    EditOrdreInterventionComponent,
    TiersComponent,
    IndexComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    NgCircleProgressModule.forRoot(),
    FormsModule
  ],
  providers: [
    DatePipe
  ],
})
export class MaintenanceModule { }
