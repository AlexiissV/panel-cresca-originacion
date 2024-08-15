import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Group } from 'src/app/interfaces/productof.interface';
import { MessageService } from 'primeng/api';
import { postInfo } from 'src/app/interfaces/general.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-capacidad',
  templateUrl: './capacidad.component.html',
  styleUrls: ['./capacidad.component.scss'],
  providers: [MessageService]
})
export class CapacidadComponent implements OnInit {
  banderafn:boolean=false;
  salir:boolean=false;
  estatus_solicitud:number = 0;
  formulario: Group[] = [];

  constructor(private local: LocalService,
    private post: SolicitudService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router) {
  }
  async ngOnInit(): Promise<void> {
    if (this.local.capacidad_info != null) {
      this.formulario = this.local.capacidad_info;
      for(let uno of this.formulario){
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
      //@ts-ignore
      this.estatus_solicitud=this.local.estatus_solicitud;
    }

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
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
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
    if(!this.banderafn){
      this.banderafn= true;
    }
    this.local.show();   
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 40,capacidad:info})
    .subscribe({
      next: (resp) => {
        this.local.hide();
        this.banderafn= false;
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
        this.banderafn= false;
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
