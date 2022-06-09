import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcoconduitRoutingModule } from './ecoconduit-routing.module';
import { FormsModule } from '@angular/forms';
import { ConducteursModule } from './conducteurs/conducteurs.module';
import { VehiculesModule } from './vehicules/vehicules.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    VehiculesModule,
    ConducteursModule,
    CommonModule,
    EcoconduitRoutingModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
})
export class EcoconduitModule { }
