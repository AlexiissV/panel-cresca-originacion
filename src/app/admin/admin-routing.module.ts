import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { BarrasiGuard } from '../guards/barrasi.guard';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SimulaComponent } from '../promotor/simula/simula.component';

const routes: Routes = [
  {path:'home', component:HomeAdminComponent, canActivate:[BarrasiGuard]},
  {path:'solicitud/:id', component:SolicitudComponent, canActivate:[BarrasiGuard]},
  {path:'**', redirectTo:'home', pathMatch:'full'},
  {path:'', redirectTo:'home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
