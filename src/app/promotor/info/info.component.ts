import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NufiService } from '../../services/nufi.service';
import { Group, ItemsList, formNufi, postInfo } from 'src/app/interfaces/general.interface';
import { arraydocs } from 'src/app/interfaces/general.interface';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [MessageService]
})
export class InfoComponent implements OnInit {
  persona: string = '';
  view_aval: boolean=false;
  salir: boolean = false;
  view: boolean = true;
  info: postInfo[] = [];
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
    img_reverso: '',
    rfc: '',
    ine_numero: '',
    ine_vigencia: '',
    domicilio_cp: '',
    domicilio_estado: '',
    domicilio_municipio: '',
    domicilio_colonia: '',
    domicilio_direccion: '',
    estado_civil: '',
    solicitante_fecha_constitucion: '',
    solicitante_nombre_contacto: '',
    solicitante_acta_constitutiva: '',
    solicitante_poderes_representante: ''
  };
  formrepresentante: formNufi = {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    sexo: '',
    nombre: '',
    reporte_id: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: '',
    rfc: '',
    ine_numero: '',
    ine_vigencia: '',
    domicilio_cp: '',
    domicilio_estado: '',
    domicilio_municipio: '',
    domicilio_colonia: '',
    domicilio_direccion: '',
    estado_civil: '',
    solicitante_fecha_constitucion: '',
    solicitante_nombre_contacto: '',
    solicitante_acta_constitutiva: '',
    solicitante_poderes_representante: ''
  };
  formsaval: formNufi = {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    reporte_id: '',
    sexo: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: '',
    rfc: '',
    ine_numero: '',
    ine_vigencia: '',
    domicilio_cp: '',
    domicilio_estado: '',
    domicilio_municipio: '',
    domicilio_colonia: '',
    domicilio_direccion: '',
    estado_civil: '',
    solicitante_fecha_constitucion: '',
    solicitante_nombre_contacto: '',
    solicitante_acta_constitutiva: '',
    solicitante_poderes_representante: ''
  };


  constructor(private post: SolicitudService,
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
      this.formsolicitante = this.local.formsolicitante;
      this.persona = this.formsolicitante.tipo_persona;
      this.formrepresentante = this.local.formrepresentante;
      this.formsaval = this.local.formsaval;
      if(this.formrepresentante.is_aval){
        this.view_aval=true;
      }
      for(let uno of this.Cuestionario){
        for(let dos of uno.items){
          if(dos.tipo_dato==40){
          if(dos.value_register!=null || dos.value_register!=''){
            dos.items_list?.forEach(item=>{
              if(item.text===dos.value_register){
                dos.select= item;
              }
            });
          }
        }
        }
      }
      setTimeout(() => {
        this.estatus_solicitud = this.local.estatus_solicitud;
        if (this.estatus_solicitud != 2 && this.estatus_solicitud != 0) {
          this.view = false;
        }
      }, 500);
    }else{
      this.doc_general = this.local.doc_general;
      this.formsolicitante = this.local.formsolicitante;
      this.persona = this.formsolicitante.tipo_persona;
      this.formrepresentante = this.local.formrepresentante;
      this.formsaval = this.local.formsaval;
      if(this.formrepresentante.is_aval){
        this.view_aval=true;
      }
      this.post.getGenerales().subscribe(
        {
          next: (resp) => {
            this.Cuestionario = resp['cuestionario-identificacion'][0].groups;
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
    
  }
  selectuno(event: any, n: number, i: number) {
    this.Cuestionario[n].items[i].value_register = event.value['text'];
  }
  prueba() {
    if (this.persona == 'Fisica') {
      this.formrepresentante = this.formsolicitante;
    }
    if(this.view_aval){
      this.formsaval = this.formrepresentante;
      this.formrepresentante.apply_legal_condicional=10;
    }else{
      this.formrepresentante.apply_legal_condicional=20;
    }
    if (this.formsolicitante.rfc == '' || this.formrepresentante.rfc == '' || this.formsaval.rfc == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: ' Formularios incompletos' });
      return;
    }
   /* if(this.persona == 'Moral'){
      if (this.formrepresentante.reporte_id == '' || this.formsaval.reporte_id == '') {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reportes incompletos' });
        return;
      }
    }else{
      if (this.formsolicitante.reporte_id == '' || this.formrepresentante.reporte_id == '' || this.formsaval.reporte_id == '') {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reportes incompletos' });
        return;
      }
    }*/
    
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
    if (this.Cuestionario.length >= 1) {
      if (bandera) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Información Adicional Incompleta' });
        return;
      }
      this.local.show();
      this.info = [];
      for (let uno of this.Cuestionario) {
        for (let dos of uno.items) {
          let pregunta: postInfo = {
            element_id: Number(dos.id),
            value: dos.value_register + ''
          }
          this.info.push(pregunta);
        }
      }
    }
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0) {
      this.inicarSolicitud(this.info);
    } else {
      this.updatesolicitud(this.info, this.local.solicitud_id);
    }
  }

  inicarSolicitud(info: postInfo[]) {
    this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info, solicitante: this.formsolicitante, legal: this.formrepresentante, aval: this.formsaval })
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
    this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 10, identificacion: info, solicitante: this.formsolicitante, legal: this.formrepresentante, aval: this.formsaval, solicitud_id }).subscribe({
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
    } else if (event['rfc']) {
      switch (this.activeIndex) {
        case 0:
          this.formsolicitante = event;
          if(this.formsolicitante.tipo_persona=='Fisica'){
            this.generareporte(event);
          }else{
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Las Personas Morales no se genera Reporte' });
          }
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
    /*  switch (this.activeIndex) {
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
      return;*/
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
           //  this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: () => {
          this.local.hide();
        //  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No pudimos completar la solicitud, intenta mas tarde' });

        }
      });
  }
  solicitantepersona(event: string) {
    this.persona = event;
  }
  tambienaval(event:boolean) {
    this.view_aval= event;    
    }
}