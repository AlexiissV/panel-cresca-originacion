import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LocalService } from '../../services/local.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-originacion',
  templateUrl: './originacion.component.html',
  styleUrls: ['./originacion.component.scss'],
  providers: [MessageService]
})
export class OriginacionComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
  estatus_solicitud: number = 0;
  solicitud_id: number = 0;

    constructor(private local: LocalService, 
                private post: SolicitudService,
                private messageService: MessageService,){}
  
  ngOnInit(): void {
    this.items = [{
      label: 'Generales',
      routerLink: 'informacion'
    },
    {
      label: 'Presupuesto',
      routerLink: 'presupuesto'
    },
    {
      label: 'Terminos del Credito',
      routerLink: 'terminos'
    },
    {
      label: 'Simulador',
      routerLink: 'simulador'
    },
    {
      label: 'SIC',
      routerLink: 'sic'
    },
    {
      label: 'Capacidad',
      routerLink: 'capacidad'
    },
    {
      label: 'Documentación',
      routerLink: 'documentacion'
    }
    ];
    setTimeout(() => {
      this.estatus_solicitud = this.local.estatus_solicitud;
      this.solicitud_id= this.local.solicitud_id;
    }, 100);

  }
  cancelarsolicitud() {
    this.local.show();
    this.post.cancelarsolicitud(this.local.solicitud_id)
    .subscribe({
      next:(resp)=>{
        this.local.hide();
        if(resp.code==202){
          this.messageService.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
          setTimeout(() => {
            location.reload();
          }, 700);
        }else{
          this.messageService.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
        }
      },
      error:()=>{
        this.local.hide();
      }
    });
    }
}
