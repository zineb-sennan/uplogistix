import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './globale/edit/edit.component';
import { IndexComponent } from './globale/index/index.component';

@NgModule({
  declarations: [
    EditComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule
  ]
})
export class ClientsModule { }
