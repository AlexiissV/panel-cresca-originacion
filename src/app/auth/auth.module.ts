import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RessetPassComponent } from './resset-pass/resset-pass.component';


@NgModule({
  declarations: [
    LoginComponent,
    RessetPassComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    RouterModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
