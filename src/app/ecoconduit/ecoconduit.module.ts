import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcoconduitRoutingModule } from './ecoconduit-routing.module';
import { FormsModule } from '@angular/forms';
import { AnalyseVehiculeModule } from './analyse-vehicule/analyse-vehicule.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    AnalyseVehiculeModule,
    CommonModule,
    EcoconduitRoutingModule,
    FormsModule
  ]
})
export class EcoconduitModule { }
