import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from '../_helpers/auth-guard-user';
import { AuthGuardAdmin } from '../_helpers/auth-guard-admin';
import { IndexComponent } from './globale/index/index.component';
import { EditComponent } from './globale/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'page/:page', component: IndexComponent, canActivate: [AuthGuardAdmin] },
      { path: 'edit', component: EditComponent, canActivate: [AuthGuardAdmin] },
      { path: ':id/edit', component: EditComponent, canActivate: [AuthGuardAdmin] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FournisseursRoutingModule { }