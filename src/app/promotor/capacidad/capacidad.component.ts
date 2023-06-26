import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { Group, ProductoFinanciero } from 'src/app/interfaces/productof.interface';
import { MessageService } from 'primeng/api';
import { postInfo } from 'src/app/interfaces/general.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-capacidad',
  templateUrl: './capacidad.component.html',
  styleUrls: ['./capacidad.component.scss'],
  providers: [MessageService]
})
export class CapacidadComponent implements OnInit {
  salir:boolean=false;
  capacidad_id: number = 0;
  estatus_solicitud:number = 0;
  p_financiero: ProductoFinanciero[] = [];
  formulario: Group[] = [];
  select: ProductoFinanciero = {
    id: 0,
    nombre: '',
    secciones: [],
    documentos: []
  };

  constructor(private local: LocalService,
    private post: PostService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router) {
  }
  async ngOnInit(): Promise<void> {
    this.p_financiero.push({
      id: 0,
      nombre: '',
      secciones: [],
      documentos:[]
    });
   this.post.getProductoFinaciero()
      .subscribe({
        next: (resp) => {
          this.p_financiero.push(...resp['producto-financiero']);
          if (this.local.capacidad_info != null) {
            this.formulario = this.local.capacidad_info;
            //@ts-ignore
            this.select = this.p_financiero.find((item => item.id == this.local.capacidad_id));
            this.estatus_solicitud=this.local.estatus_solicitud;
          }
        },
        error: () => {
        }
      });
  }

  seleccion(event: any) {
    this.capacidad_id = event.value['id'];
    this.local.capacidad_id=this.capacidad_id;
    this.local.doc_finaciero= event.value['documentos'];    
    let cuestions: Group[] = event.value.secciones[0]['groups'];
    for (let i = 0; i < cuestions.length; i++) {
      cuestions[i].items = cuestions[i].items.map(item => ({ ...item, value_register: '' }));
    }
    this.formulario = cuestions;
  }
  selectuno(event: any, n: number, i: number) {
    this.formulario[n].items[i].value_register = event.value['text'];
  }

  findelproceso() {
    let bandera: boolean = false;
    for (let uno of this.formulario) {
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
    for (let uno of this.formulario) {
      for (let dos of uno.items) {
        let pregunta: postInfo = {
          element_id: dos.id,
          value: dos.value_register + ''
        }
        info.push(pregunta);
      }
    }
    this.local.show();   
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 40,capacidad_id:this.capacidad_id,capacidad:info})
    .subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          this.local.capacidad_info = this.formulario;
          if(this.salir){
            this.router.navigate(['/promotor/promotor/']);
          }else{
            this.router.navigate(['/promotor/originacion/documentacion']);
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
    this.salir= true;
    this.findelproceso();
    }
}
