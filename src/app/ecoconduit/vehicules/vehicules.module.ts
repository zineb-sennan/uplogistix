import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleVehiculeComponent } from './globale-vehicule/globale-vehicule.component';
import { AnalyseParVehiculeComponent } from './components/analyse-par-vehicule/analyse-par-vehicule.component';
import { ClassementVehiculeComponent } from './components/classement-vehicule/classement-vehicule.component';
import { ComparaisonVehiculeComponent } from './components/comparaison-vehicule/comparaison-vehicule.component';
import { FicheVehiculeComponent } from './components/fiche-vehicule/fiche-vehicule.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    GlobaleVehiculeComponent,
    AnalyseParVehiculeComponent,
    ClassementVehiculeComponent,
    ComparaisonVehiculeComponent,
    FicheVehiculeComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class VehiculesModule { }
