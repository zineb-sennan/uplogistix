import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { PieceCategoriesComponent } from './piece-categories/piece-categories.component';
import { IndexEntrepotComponent } from './entrepots/index-entrepot/index-entrepot.component';
import { EditEntrepotComponent } from './entrepots/edit-entrepot/edit-entrepot.component';
import { IndexPiecesRechangeComponent } from './pieces-rechange/index-pieces-rechange/index-pieces-rechange.component';
import { EditPiecesRechangeComponent } from './pieces-rechange/edit-pieces-rechange/edit-pieces-rechange.component';
import { IndexBonsReceptionComponent } from './bons_reception/index-bons-reception/index-bons-reception.component';
import { EditBonsReceptionComponent } from './bons_reception/edit-bons-reception/edit-bons-reception.component';
import { IndexBonsRetourComponent } from './bons_retour/index-bons-retour/index-bons-retour.component';
import { EditBonsRetourComponent } from './bons_retour/edit-bons-retour/edit-bons-retour.component';
import { IndexBonsTransfertComponent } from './bons-transfert/index-bons-transfert/index-bons-transfert.component';
import { EditBonsTransfertComponent } from './bons-transfert/edit-bons-transfert/edit-bons-transfert.component';
import { IndexInventairesComponent } from './inventaires/index-inventaires/index-inventaires.component';
import { EditInventairesComponent } from './inventaires/edit-inventaires/edit-inventaires.component';


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
      { path: 'pieces-rechange/edit', component: EditPiecesRechangeComponent, canActivate: [AuthGuardUser] },
      /*** les bons reception ***/
      { path: 'bons-reception', component: IndexBonsReceptionComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-reception/:id/edit', component: EditBonsReceptionComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-reception/edit', component: EditBonsReceptionComponent, canActivate: [AuthGuardUser] },
      /*** les bons retour ***/
      { path: 'bons-retour', component: IndexBonsRetourComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-retour/:id/edit', component: EditBonsRetourComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-retour/edit', component: EditBonsRetourComponent, canActivate: [AuthGuardUser] },
      /*** les bons retour ***/
      { path: 'bons-transfert', component: IndexBonsTransfertComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-transfert/:id/edit', component: EditBonsTransfertComponent, canActivate: [AuthGuardUser] },
      { path: 'bons-transfert/edit', component: EditBonsTransfertComponent, canActivate: [AuthGuardUser] },
       /*** les inventaires ***/
      { path: 'inventaires', component: IndexInventairesComponent, canActivate: [AuthGuardUser] },
      { path: 'inventaires/:id/edit', component: EditInventairesComponent, canActivate: [AuthGuardUser] },
      { path: 'inventaires/edit', component: EditInventairesComponent, canActivate: [AuthGuardUser] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class StockRoutingModule { }