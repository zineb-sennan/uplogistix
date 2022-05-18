import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobaleComponent } from './globale/globale.component';
import { ConducteurRoutingModule } from './conducteur-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GlobaleComponent
  ],
  imports: [
    CommonModule,
    ConducteurRoutingModule,
    FormsModule
  ]
})
export class ConducteursModule { }
