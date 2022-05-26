import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleComponent } from './globale/globale.component';
import { AnalyseParConducteurComponent } from './components/analyse-par-conducteur/analyse-par-conducteur.component';
import { ComparaisonConducteursComponent } from './components/comparaison-conducteurs/comparaison-conducteurs.component';
import { ClassementConducteursComponent } from './components/classement-conducteurs/classement-conducteurs.component';
import { FicheConducteurComponent } from './components/fiche-conducteur/fiche-conducteur.component';



@NgModule({
  declarations: [
    GlobaleComponent,
    AnalyseParConducteurComponent,
    ComparaisonConducteursComponent,
    ClassementConducteursComponent,
    FicheConducteurComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConducteursModule { }
