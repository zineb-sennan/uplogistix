import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupeComponent } from './groupe/groupe.component';
import { VehiculeRoutingModule } from './vehicule-routing.module';
import { FormsModule } from '@angular/forms';
import { ModeleComponent } from './modele/modele.component';
import { MarqueComponent } from './marque/marque.component';
import { CategorieComponent } from './categorie/categorie.component';
import { IndexComponent } from './globale/index/index.component';
import { EditComponent } from './globale/edit/edit.component';
import { CarburantComponent } from './carburant/carburant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoriqueCompteurComponent } from './historique-compteur/historique-compteur.component';
import { DepensesComponent } from './depenses/depenses.component';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    GroupeComponent,
    ModeleComponent,
    MarqueComponent,
    CategorieComponent,
    IndexComponent,
    EditComponent,
    CarburantComponent,
    DashboardComponent,
    HistoriqueCompteurComponent,
    DepensesComponent
  ],
  imports: [
    CommonModule,
    VehiculeRoutingModule,
    FormsModule,
  ],
  providers: [
    DatePipe
  ],
})
export class VehiculesModule { }
