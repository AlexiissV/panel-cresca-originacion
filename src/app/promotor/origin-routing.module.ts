import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OriginacionComponent } from './originacion/originacion.component';
import { InfoComponent } from './info/info.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { CapacidadComponent } from './capacidad/capacidad.component';
import { BarrasiGuard } from '../guards/barrasi.guard';
import { SimuladorComponent } from './simulador/simulador.component';
import { TerminosComponent } from './terminos/terminos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { ContratoComponent } from './contrato/contrato.component';
import { ContratoDetailComponent } from './contrato-detail/contrato-detail.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[BarrasiGuard]},
  {path:'contratos', component:ContratoComponent, canActivate:[BarrasiGuard]},
  {path:'detail-contrato', component:ContratoDetailComponent, canActivate:[BarrasiGuard]},
  {path:'inspeccion', component:InspeccionComponent, canActivate:[BarrasiGuard]},
  {
    path: 'originacion',
    component: OriginacionComponent,canActivate:[BarrasiGuard],
    children: [
      {path: '', redirectTo: 'informacion', pathMatch: 'full'},
      { path: 'informacion', component: InfoComponent, canActivate:[BarrasiGuard] },
      { path: 'presupuesto', component: PresupuestoComponent, canActivate:[BarrasiGuard] },
      { path: 'terminos', component: TerminosComponent, canActivate:[BarrasiGuard] },
      { path: 'simulador', component: SimuladorComponent, canActivate:[BarrasiGuard] },
      { path: 'capacidad', component: CapacidadComponent, canActivate:[BarrasiGuard] },
      { path: 'documentacion', component: DocumentacionComponent, canActivate:[BarrasiGuard] },
    ],
  },
  {path:'**', redirectTo:'home', pathMatch:'full'},
  {path:'', redirectTo:'home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OriginRoutingModule { }
