import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  nombre: string = '';
  //@ts-ignore
  ref: DynamicDialogRef;


  constructor(private router: Router,
    public local: LocalService,
    private auth: AuthService,
    public dialogService: DialogService) {
    this.nombre = auth.usuario.nombre + ' ' + auth.usuario.apellidos

  }
  ngOnInit(): void {
  }
  getheaderClass(): string {
    let styleclass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleclass = 'head-trimmed'
    } else {
      styleclass = 'head-md-screen'
    }
    return styleclass;
  }

  async cerrarsesion() {
    await localStorage.clear();
    this.router.navigate(['/auth/sign-in', this.local.empresa.token]);
  }

  showperfil() {
    this.ref = this.dialogService.open(PerfilComponent, {
      header: 'Mi Perfil', width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: this.auth.usuario
    });
  }

}
