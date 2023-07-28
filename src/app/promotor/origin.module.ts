import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OriginRoutingModule } from './origin-routing.module';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { CapacidadComponent } from './capacidad/capacidad.component';
import { PrimengModule } from '../primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { OriginacionComponent } from './originacion/originacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladorComponent } from './simulador/simulador.component';
import { TerminosComponent } from './terminos/terminos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { ContratoComponent } from './contrato/contrato.component';
import { ContratoDetailComponent } from './contrato-detail/contrato-detail.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';
import { SicComponent } from './sic/sic.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent,
    PresupuestoComponent,
    CapacidadComponent,
    OriginacionComponent,
    SimuladorComponent,
    TerminosComponent,
    DocumentacionComponent,
    ContratoComponent,
    ContratoDetailComponent,
    InspeccionComponent,
    SicComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    OriginRoutingModule
  ]
})
export class OriginModule { }
