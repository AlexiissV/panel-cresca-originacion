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
import { SicComponent } from './sic/sic.component';
import { SolicitudGuard } from '../guards/solicitud.guard';
import { IndicadoresGuard } from '../guards/indicadores.guard';
import { SimulaComponent } from './simula/simula.component';
import { PresupComponent } from './presup/presup.component';
import { TermiComponent } from './termi/termi.component';
import { CorridaComponent } from './corrida/corrida.component';
import { LimpiaGuard } from '../guards/limpia.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [BarrasiGuard, IndicadoresGuard] },
  { path: 'contratos', component: ContratoComponent, canActivate: [BarrasiGuard, IndicadoresGuard] },
  { path: 'detail-contrato', component: ContratoDetailComponent, canActivate: [BarrasiGuard] },
  { path: 'inspeccion', component: InspeccionComponent, canActivate: [BarrasiGuard, IndicadoresGuard] },
  {
    path: 'simulador', component: SimulaComponent, canActivate: [BarrasiGuard, LimpiaGuard],
    children: [
      { path: '', redirectTo: 'presupuesto', pathMatch: 'full' },
      { path: 'presupuesto', component: PresupComponent, canActivate: [BarrasiGuard] },
      { path: 'terminos', component: TermiComponent, canActivate: [BarrasiGuard] },
      { path: 'simulador', component: CorridaComponent, canActivate: [BarrasiGuard] },
    ],
  },

  {
    path: 'originacion',
    component: OriginacionComponent, canActivate: [BarrasiGuard],
    children: [
      { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      { path: 'informacion', component: InfoComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'presupuesto', component: PresupuestoComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'terminos', component: TerminosComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'simulador', component: SimuladorComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'sic', component: SicComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'capacidad', component: CapacidadComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
      { path: 'documentacion', component: DocumentacionComponent, canActivate: [BarrasiGuard, SolicitudGuard] },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OriginRoutingModule { }
