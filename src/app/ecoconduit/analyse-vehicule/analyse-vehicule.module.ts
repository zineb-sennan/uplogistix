import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationsVehiculeComponent } from './components/informations-vehicule/informations-vehicule.component';
import { ComparaisonVehiculeComponent } from './components/comparaison-vehicule/comparaison-vehicule.component';
import { ClassementVehiculeComponent } from './components/classement-vehicule/classement-vehicule.component';
import { GlobaleComponent } from './globale/globale.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FicheVehiculeComponent } from './components/fiche-vehicule/fiche-vehicule.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    InformationsVehiculeComponent,
    ComparaisonVehiculeComponent,
    ClassementVehiculeComponent,
    GlobaleComponent,
    FicheVehiculeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class AnalyseVehiculeModule { }
