import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { PieceCategoriesComponent } from './piece-categories/piece-categories.component';
import { EditEntrepotComponent } from './entrepots/edit-entrepot/edit-entrepot.component';
import { IndexEntrepotComponent } from './entrepots/index-entrepot/index-entrepot.component';
import { IndexPiecesRechangeComponent } from './pieces-rechange/index-pieces-rechange/index-pieces-rechange.component';
import { EditPiecesRechangeComponent } from './pieces-rechange/edit-pieces-rechange/edit-pieces-rechange.component';
import { FormsModule } from '@angular/forms';
import { IndexBonsReceptionComponent } from './bons_reception/index-bons-reception/index-bons-reception.component';
import { EditBonsReceptionComponent } from './bons_reception/edit-bons-reception/edit-bons-reception.component';
import { IndexBonsRetourComponent } from './bons_retour/index-bons-retour/index-bons-retour.component';
import { EditBonsRetourComponent } from './bons_retour/edit-bons-retour/edit-bons-retour.component';



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
    EditBonsRetourComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule
  ]
})
export class StockModule { }
