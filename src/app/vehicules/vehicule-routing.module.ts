import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { CarburantComponent } from './carburant/carburant.component';
import { CategorieComponent } from './categorie/categorie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './globale/edit/edit.component';
import { IndexComponent } from './globale/index/index.component';
import { GroupeComponent } from './groupe/groupe.component';
import { MarqueComponent } from './marque/marque.component';
import { ModeleComponent } from './modele/modele.component';
import { HistoriqueCompteurComponent } from './historique-compteur/historique-compteur.component';
import { DepensesComponent } from './depenses/depenses.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page/:page',
        component: IndexComponent,
        data: { title: 'Gestion des vehicules' },
        canActivate: [AuthGuardUser]
      },
      { 
        path: 'edit',
        component: EditComponent,
        data: { title: 'Gestion des vehicules' },
        canActivate: [AuthGuardUser] 
      },
      { 
        path: ':id/edit',
        component: EditComponent,
        data: { title: 'Gestion des vehicules' },
        canActivate: [AuthGuardUser] 
      },
      {
        path: ':id/dashboard',
        component:DashboardComponent,
        data: { title: 'Dashboard de vehicule' },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'groupes',
        component: GroupeComponent,
        data: { title: 'Gestion des groupe vehicule' },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'marques/page/:page',
        component: MarqueComponent,
        data: { title: 'Gestion des marques vehicule' },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'categories',
        component: CategorieComponent,
        data: { title: 'Gestion des categories vehicule' },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'marque/:id/modeles',
        component: ModeleComponent,
        data: { title: 'Gestion des modeles vehicule' },
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'carburants/page/:page',
        component:CarburantComponent,
        data: { title: 'Gestion des carburants' },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'compteurs/page/:page',
        component:HistoriqueCompteurComponent,
        data: { title: 'Gestion des carburants (Saisi manuel)' },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'gps-compteurs/find/page/:page',
        component:HistoriqueCompteurComponent,
        data: { title: 'Gestion des carburants (Relevé automatique)' },
        canActivate: [AuthGuardUser]
      },
      {
        path: 'depenses/page/:page',
        component:DepensesComponent,
        data: { title: 'Gestion des depenses' },
        canActivate: [AuthGuardUser]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class VehiculeRoutingModule { }