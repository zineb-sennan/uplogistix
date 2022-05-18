import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcoconduitRoutingModule } from './ecoconduit-routing.module';
import { FormsModule } from '@angular/forms';
import { AnalyseVehiculeComponent } from './analyse-vehicule/analyse-vehicule.component';
import { AnalyseConducteurComponent } from './analyse-conducteur/analyse-conducteur.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AnalyseVehiculeComponent,
    AnalyseConducteurComponent
  ],
  imports: [
    CommonModule,
    EcoconduitRoutingModule,
    FormsModule
  ]
})
export class EcoconduitModule { }
