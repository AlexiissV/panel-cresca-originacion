import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilGuard } from './guards/perfil.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m =>m.AuthModule)
  },
  {
    path:'promotor',canActivate:[PerfilGuard],
    loadChildren:()=> import('./promotor/origin.module').then(m =>m.OriginModule)
  },
  {
    path:'admin',canActivate:[PerfilGuard],
    loadChildren:()=> import('./admin/admin.module').then(m =>m.AdminModule)
  },
  {
    path: 'not-found', component: NotfoundComponent
  },
  {
    path:'**',
    redirectTo:'not-found'
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
