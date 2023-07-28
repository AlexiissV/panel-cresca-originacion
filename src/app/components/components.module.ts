import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OverlayModule } from 'primeng/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { PrimengModule } from '../primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormgeneralesComponent } from './formgenerales/formgenerales.component';
import { ReportenufiComponent } from './reportenufi/reportenufi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoaderComponent,
    BodyComponent,
    HeaderComponent,
    SidenavComponent,
    NotfoundComponent,
    PerfilComponent,
    FormgeneralesComponent,
    ReportenufiComponent
  ],
  exports:[
    LoaderComponent,
    BodyComponent,
    HeaderComponent,
    SidenavComponent,
    FormgeneralesComponent,
    ReportenufiComponent],
  imports: [
    CommonModule,
    OverlayModule,
    CdkMenuModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
