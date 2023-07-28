import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeAdminComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ComponentsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
