import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarranoGuard } from '../guards/barrano.guard';
import { LoginComponent } from './login/login.component';
import { RessetPassComponent } from './resset-pass/resset-pass.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

const routes :Routes=[
  {
    path:'',
    children:[
      {path:'sign-in/:token_empresa', component: LoginComponent, canActivate:[BarranoGuard]},
      {path:'reset-pass', component: RessetPassComponent, canActivate:[BarranoGuard]},      
      {path:'**', redirectTo:'not-found'},
      {
        path: 'not-found', component: NotfoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
