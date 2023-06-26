import { Component } from '@angular/core';
import { LocalService } from './services/local.service';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cresca-originacion';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private auth: AuthService, 
              public local: LocalService,
              private titulo: Title){
    let empresa = localStorage.getItem('empresa');   
    if(empresa!= null){
     local.empresa= JSON.parse(empresa);
     this.titulo.setTitle(local.empresa.empresa_nombre);
     document.documentElement.style.setProperty('--color-principal', local.empresa.empresa_color);
    }
    let data = localStorage.getItem('usuario');   
    if(data!= null){
     auth.usuario= JSON.parse(data);
    }
    
 
   }
 
   onToggleSideNav(data: SideNavToggle): void {
     this.screenWidth = data.screenWidth;
     this.isSideNavCollapsed = data.collapsed;
   }
}
