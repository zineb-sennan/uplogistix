import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ]
})
export class EcoconduitModule { }
