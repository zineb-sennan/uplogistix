import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FournisseursRoutingModule } from './fournisseurs-routing.module';
import { IndexComponent } from './globale/index/index.component';
import { EditComponent } from './globale/edit/edit.component';



@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FournisseursRoutingModule
  ]
})
export class FournisseursModule { }
