import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparaisonVehiculeComponent } from './components/comparaison-vehicule/comparaison-vehicule.component';
import { ClassementVehiculeComponent } from './components/classement-vehicule/classement-vehicule.component';
import { GlobaleComponent } from './globale/globale.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FicheVehiculeComponent } from './components/fiche-vehicule/fiche-vehicule.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AnalyseParVehiculeComponent } from './components/analyse-par-vehicule/analyse-par-vehicule.component';


@NgModule({
  declarations: [
    ComparaisonVehiculeComponent,
    ClassementVehiculeComponent,
    GlobaleComponent,
    FicheVehiculeComponent,
    AnalyseParVehiculeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class AnalyseVehiculeModule { }
