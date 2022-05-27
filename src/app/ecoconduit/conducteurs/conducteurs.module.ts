import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyseParConducteurComponent } from './components/analyse-par-conducteur/analyse-par-conducteur.component';
import { ComparaisonConducteursComponent } from './components/comparaison-conducteurs/comparaison-conducteurs.component';
import { ClassementConducteursComponent } from './components/classement-conducteurs/classement-conducteurs.component';
import { FicheConducteurComponent } from './components/fiche-conducteur/fiche-conducteur.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { GlobaleConducteurComponent } from './globale-conducteur/globale-conducteur.component';



@NgModule({
  declarations: [
    AnalyseParConducteurComponent,
    ComparaisonConducteursComponent,
    ClassementConducteursComponent,
    FicheConducteurComponent,
    GlobaleConducteurComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class ConducteursModule { }
