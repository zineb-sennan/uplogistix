import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { PieceCategoriesComponent } from './piece-categories/piece-categories.component';
import { IndexEntrepotComponent } from './entrepots/index-entrepot/index-entrepot.component';
import { EditEntrepotComponent } from './entrepots/edit-entrepot/edit-entrepot.component';
import { IndexPiecesRechangeComponent } from './pieces-rechange/index-pieces-rechange/index-pieces-rechange.component';
import { EditPiecesRechangeComponent } from './pieces-rechange/edit-pieces-rechange/edit-pieces-rechange.component';


const routes: Routes = [
  {
    path: '',
    children: [
      /*** les entrepots ***/
      { path: 'entrepots', component: IndexEntrepotComponent, canActivate: [AuthGuardUser] },
      { path: 'entrepots/:id/edit', component: EditEntrepotComponent, canActivate: [AuthGuardUser] },
      { path: 'entrepots/edit', component: EditEntrepotComponent, canActivate: [AuthGuardUser] },
      /*** les piece categories ***/
      { path: 'piece-categories', component: PieceCategoriesComponent, canActivate: [AuthGuardUser] },
      /*** les pieces rechange ***/
      { path: 'pieces-rechange', component: IndexPiecesRechangeComponent, canActivate: [AuthGuardUser] },
      { path: 'pieces-rechange/:id/edit', component: EditPiecesRechangeComponent, canActivate: [AuthGuardUser] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class StockRoutingModule { }