import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PwdOublieComponent } from './pwd-oublie/pwd-oublie.component';


@NgModule({
  declarations: [
    LoginComponent,
    ErrorComponent,
    PwdOublieComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ]
})
export class AuthenticationModule { }
