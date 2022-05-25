import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleComponent } from './globale/globale.component';
import { BaliseRoutingModule } from './balise-routing.module';
import { FormsModule } from '@angular/forms';
import { InformationsComponent } from './informations/informations.component';



@NgModule({
  declarations: [
    GlobaleComponent,
    InformationsComponent
  ],
  imports: [
    CommonModule,
    BaliseRoutingModule,
    FormsModule
  ]
})
export class BalisesModule { }
