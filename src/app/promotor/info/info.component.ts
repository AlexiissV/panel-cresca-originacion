import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Group, arraydocs, postInfo } from 'src/app/interfaces/general.interface';
import { ItemsList } from '../../interfaces/general.interface';
import { MessageService } from 'primeng/api';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [MessageService]
})
export class InfoComponent implements OnInit {
  salir: boolean = false;
  estatus_solicitud:number = 0;
  //@ts-ignore
  element: HTMLElement;

  Cuestionario: Group[] = [];
  doc_general: arraydocs[] = [];
  selectedCity: ItemsList = {
    id: 0,
    text: ''
  };
  solicitante: boolean = false;


  constructor(private post: PostService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private local: LocalService,
    private auth: AuthService,
    private router: Router) {
  }
  ngOnInit(): void {
    if (this.local.Cuestionario.length >= 1) {
      this.Cuestionario = this.local.Cuestionario;
      setTimeout(() => {
        this.element = document.getElementById('1') as HTMLElement;
        this.element.style.display = 'none';
        this.estatus_solicitud= this.local.estatus_solicitud;
      }, 500);
      return;
    }
    this.post.getGenerales().subscribe(
      {
        next: (resp) => {
          this.Cuestionario = resp['cuestionario-identificacion'][0].groups
          for (let i = 0; i < this.Cuestionario.length; i++) {
            this.Cuestionario[i].items = this.Cuestionario[i].items.map(item => ({ ...item, value_register: '' }));
          }
          this.doc_general = resp.documentos;
        },
        error: () => {

        }
      }
    );
  }

  selectuno(event: any, n: number, i: number) {
    this.Cuestionario[n].items[i].value_register = event.value['text'];
    this.element = document.getElementById('1') as HTMLElement;
    if (n == 0 && event.value['text'] == 'FISICA') {
      this.element.style.display = 'none';
      this.solicitante = true;
    } else if (n == 0 && event.value['text'] == 'MORAL' || n == 0 && event.value['text'] == '') {
      this.element.style.display = 'flex';
      this.solicitante = false;
    }
  }

  prueba() {
    if (this.solicitante) {
      for (let i = 0; i < this.Cuestionario[0].items.length; i++) {
        this.Cuestionario[1].items[i].value_register = this.Cuestionario[0].items[i].value_register
      }
    }
    let bandera: boolean = false;
    for (let uno of this.Cuestionario) {
      for (let dos of uno.items) {
        if (dos.apply_required == 10) {
          if (dos.value_register == null || dos.value_register == '') {
            bandera = true;
          }
        } else if (dos.value_register == '' || dos.value_register == null) {
          bandera = true;
        };
      }
    }
    if (bandera) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return;
    }
    this.local.show();
    let info: postInfo[] = [];
    for (let uno of this.Cuestionario) {
      for (let dos of uno.items) {
        let pregunta: postInfo = {
          element_id: Number(dos.id),
          value: dos.value_register + ''
        }
        info.push(pregunta);
      }
    }
    if (this.local.solicitud_id == null) {
      this.inicarSolicitud(info);
    } else {
      this.updatesolicitud(info, this.local.solicitud_id);
    }
  }


  validacurp(event: any) {
    // console.log(event.target.value);

  }
  inicarSolicitud(info: postInfo[]) {
    this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info }).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          this.local.Cuestionario = this.Cuestionario;
          this.local.doc_general = this.doc_general;
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          if (this.salir) {
            this.router.navigate(['/promotor/promotor/']);
          } else {
            this.router.navigate(['/promotor/originacion/presupuesto']);
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: (e) => {
        this.local.hide();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
      }
    });
  }
  updatesolicitud(info: postInfo[], solicitud_id: number) {
    this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info, solicitud_id }).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          this.local.Cuestionario = this.Cuestionario;
          this.local.doc_general = this.doc_general;
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          if (this.salir) {
            this.router.navigate(['/promotor/promotor/']);
          } else {
            this.router.navigate(['/promotor/originacion/presupuesto']);
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: (e) => {
        this.local.hide();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
      }
    });
  }
  guardasale() {
    this.salir = true;
    this.prueba();
  }
}

