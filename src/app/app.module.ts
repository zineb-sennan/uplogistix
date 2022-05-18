import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    AuthenticationModule
  ],
  providers: [
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
