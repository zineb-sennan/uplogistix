import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { PieceCategoriesComponent } from './piece-categories/piece-categories.component';
import { EditEntrepotComponent } from './entrepots/edit-entrepot/edit-entrepot.component';
import { IndexEntrepotComponent } from './entrepots/index-entrepot/index-entrepot.component';
import { IndexPiecesRechangeComponent } from './pieces-rechange/index-pieces-rechange/index-pieces-rechange.component';
import { EditPiecesRechangeComponent } from './pieces-rechange/edit-pieces-rechange/edit-pieces-rechange.component';
import { IndexInventairesComponent } from './inventaires/index-inventaires/index-inventaires.component';
import { EditInventairesComponent } from './inventaires/edit-inventaires/edit-inventaires.component';
import { GlobaleComponent } from './gestion-bons/globale/globale.component';
import { IndexBonsReceptionComponent } from './gestion-bons/components/bons_reception/index-bons-reception/index-bons-reception.component';
import { EditBonsReceptionComponent } from './gestion-bons/components/bons_reception/edit-bons-reception/edit-bons-reception.component';
import { IndexBonsRetourComponent } from './gestion-bons/components/bons_retour/index-bons-retour/index-bons-retour.component';
import { EditBonsRetourComponent } from './gestion-bons/components/bons_retour/edit-bons-retour/edit-bons-retour.component';
import { IndexBonsTransfertComponent } from './gestion-bons/components/bons-transfert/index-bons-transfert/index-bons-transfert.component';
import { EditBonsTransfertComponent } from './gestion-bons/components/bons-transfert/edit-bons-transfert/edit-bons-transfert.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PieceCategoriesComponent,
    EditEntrepotComponent,
    IndexEntrepotComponent,
    IndexPiecesRechangeComponent,
    EditPiecesRechangeComponent,
    IndexBonsReceptionComponent,
    EditBonsReceptionComponent,
    IndexBonsRetourComponent,
    EditBonsRetourComponent,
    IndexBonsTransfertComponent,
    EditBonsTransfertComponent,
    IndexInventairesComponent,
    EditInventairesComponent,
    GlobaleComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule
  ]
})
export class StockModule { }
