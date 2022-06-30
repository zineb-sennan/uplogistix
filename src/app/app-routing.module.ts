import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './authentication/error/error.component';
import { LoginComponent } from './authentication/login/login.component';
import { PwdOublieComponent } from './authentication/pwd-oublie/pwd-oublie.component';
import { IndexComponent } from './dashboard/index/index.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AuthGuard } from './_helpers/auth-guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'pwd-oublie', component: PwdOublieComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'dashboard', 
        component: IndexComponent ,
        canActivate: [AuthGuard]
      },
      {
        path: 'globale',
        loadChildren: () => import('./globale/globale.module').then(m => m.GlobaleModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'vehicules',
        loadChildren: () => import('./vehicules/vehicules.module').then(m => m.VehiculesModule)
      },
      {
        path: 'conducteurs',
        loadChildren: () => import('./conducteurs/conducteurs.module').then(m => m.ConducteursModule)
      },
      {
        path: 'balises',
        loadChildren: () => import('./balises/balises.module').then(m => m.BalisesModule)
      },
      {
        path: 'utilisateurs',
        loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule)
      },
      {
        path: 'ecoconduit',
        loadChildren: () => import('./ecoconduit/ecoconduit.module').then(m => m.EcoconduitModule)
      },
      {
        path: 'geolocalisation',
        loadChildren: () => import('./geolocalisation/geolocalisation.module').then(m => m.GeolocalisationModule)
      },
      {
        path: 'fournisseurs',
        loadChildren: () => import('./fournisseurs/fournisseurs.module').then(m => m.FournisseursModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
