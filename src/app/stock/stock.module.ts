import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { PieceCategoriesComponent } from './piece-categories/piece-categories.component';
import { EditEntrepotComponent } from './entrepots/edit-entrepot/edit-entrepot.component';
import { IndexEntrepotComponent } from './entrepots/index-entrepot/index-entrepot.component';
import { IndexPiecesRechangeComponent } from './pieces-rechange/index-pieces-rechange/index-pieces-rechange.component';
import { EditPiecesRechangeComponent } from './pieces-rechange/edit-pieces-rechange/edit-pieces-rechange.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PieceCategoriesComponent,
    EditEntrepotComponent,
    IndexEntrepotComponent,
    IndexPiecesRechangeComponent,
    EditPiecesRechangeComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule
  ]
})
export class StockModule { }
