import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    CopyrightComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CopyrightComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent
  ],
  providers: [
    DatePipe
  ],
})
export class DashboardModule { }
