import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleComponent } from './globale/globale.component';
import { BaliseRoutingModule } from './balise-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GlobaleComponent
  ],
  imports: [
    CommonModule,
    BaliseRoutingModule,
    FormsModule
  ]
})
export class BalisesModule { }
