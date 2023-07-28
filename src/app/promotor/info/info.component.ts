import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MessageService } from 'primeng/api';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NufiService } from '../../services/nufi.service';
import { Group, ItemsList, formNufi, postInfo } from 'src/app/interfaces/general.interface';
import { arraydocs } from 'src/app/interfaces/general.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [MessageService]
})
export class InfoComponent implements OnInit {
  persona: string = '';
  salir: boolean = false;
  view: boolean = true;
  estatus_solicitud: number = 0;
  activeIndex: number = 0;
  doc_general: arraydocs[] = [];
  selectedCity: ItemsList = {
    id: 0,
    text: ''
  };
  Cuestionario: Group[] = [];
  formsolicitante: formNufi = {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    sexo: '',
    reporte_id: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: ''
  };
  formrepresentante: formNufi = {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    sexo: '',
    nombre: '',
    reporte_id:'',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: ''
  };
  formsaval: formNufi = {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    reporte_id:'',
    sexo: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: ''
  };


  constructor(private post: PostService,
    private messageService: MessageService,
    private local: LocalService,
    private auth: AuthService,
    private nufi: NufiService,
    private router: Router) {

  }
  ngOnInit(): void {
    if (this.local.Cuestionario.length >= 1) {
      this.Cuestionario = this.local.Cuestionario;
      this.doc_general = this.local.doc_general;
      this.formsolicitante=this.local.formsolicitante;      
      this.persona= this.formsolicitante.tipo_persona;
      this.formrepresentante=this.local.formrepresentante;
      this.formsaval=this.local.formsaval;
      setTimeout(() => {
        this.estatus_solicitud = this.local.estatus_solicitud;
        if(this.estatus_solicitud!=2 && this.estatus_solicitud!=0){
          this.view=false;
        }
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
  }
    prueba() {
      if(this.persona=='Fisica'){
        this.formrepresentante= this.formsolicitante;
      }      
      if(this.formsolicitante.curp=='' || this.formrepresentante.curp=='' || this.formsaval.curp==''){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: ' Formularios incompletos' });
        return;
      }
      if(this.formsolicitante.reporte_id=='' || this.formrepresentante.reporte_id=='' || this.formsaval.reporte_id=='' ){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reportes incompletos' });
        return;
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Información Adicional Incompleta' });
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
      if (this.local.solicitud_id == null || this.local.solicitud_id == 0) {
          this.inicarSolicitud(info);
      } else {
          this.updatesolicitud(info, this.local.solicitud_id);
      }
    }
    
    inicarSolicitud(info: postInfo[]) {
      this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info ,solicitante:this.formsolicitante,legal:this.formrepresentante,aval:this.formsaval })
      .subscribe({
        next: (resp) => {          
          this.local.hide();
          if (resp.code == 202) {
            this.local.Cuestionario = this.Cuestionario;
            this.local.doc_general = this.doc_general;
            this.local.formsolicitante = this.formsolicitante;
            this.local.formrepresentante = this.formrepresentante;
            this.local.formsaval = this.formsaval;
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
      this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info ,solicitante:this.formsolicitante,legal:this.formrepresentante,aval:this.formsaval, solicitud_id }).subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.local.Cuestionario = this.Cuestionario;
            this.local.doc_general = this.doc_general;
            this.local.formsolicitante = this.formsolicitante;
            this.local.formrepresentante = this.formrepresentante;
            this.local.formsaval = this.formsaval;
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
    

  solicitarreporte(event: any) {
    if (event['message']) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos, revisa tu informacion' });
    } else if (event['curp']) {
      switch (this.activeIndex) {
        case 0:
          this.formsolicitante = event;
          this.generareporte(event);
          break;
        case 1:
          this.formrepresentante = event;
          this.generareporte(event);
          break;
        case 2:
          this.formsaval = event;
          this.generareporte(event);
          break;
        default:
          break;
      }
    }
  }
  generareporte(event: any) {
    switch (this.activeIndex) {
      case 0:
        this.formsolicitante.reporte_id = '67276a45-4559-4397-8ce9-4102afd06796';
        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'reporte ID generado' });
        break;
      case 1:
        this.formrepresentante.reporte_id = '79f0f03f-2890-468c-b785-bf2a1c84cd2b';
        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'reporte ID generado' });
        break;
      case 2:
        this.formsaval.reporte_id = '7da34ece-1ba3-4646-bc48-da5fcb9ad88f';
        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'reporte ID generado' });
        break;
      default:
        break;
    }
    return;
     this.local.show();
    this.nufi.solicitarReportenufi(event)
      .subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 200) {
            switch (this.activeIndex) {
              case 0:
                this.formsolicitante.reporte_id = resp.data.id_reporte;
                break;
              case 1:
                this.formrepresentante.reporte_id = resp.data.id_reporte;
                break;
              case 2:
                this.formsaval.reporte_id = resp.data.id_reporte;
                break;
              default:
                break;
            }
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: () => {
          this.local.hide();
        }
      }); 
  }
  solicitantepersona(event: string) {
    this.persona = event;
  }
}