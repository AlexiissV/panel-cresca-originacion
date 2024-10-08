import { Component, OnInit } from '@angular/core';
import { Visita } from 'src/app/interfaces/productof.interface';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { VisitaService } from '../../services/visita.service';
@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.scss'],
  providers: [MessageService]
})
export class InspeccionComponent implements OnInit {

  vistaverificacion: Visita[] = [];
  visita_v: number=0;
  vista_e: number=0;
  ingredient: string = '';
  verifica: boolean = false;
  entrega: boolean = false;
  tiposvisita:any[]=[
    {
      name:'Evidencia de firma contrato',
      tipo:10
    },
    {
      name:'Evidencia de firma de pagare',
      tipo:20
    },
    {
      name:'Evidencia evidencia de existencia del equipo',
      tipo:30
    }
  ];
  vistaentregas: Visita[] = [];
  selecttipo:any;
  selectedProduct: Visita = {
    id: 0,
    solicitud: '',
    producto: '',
    marca: '',
    modelo: '',
    serie: '',
    visita_status: '',
    visita_asignado: '',
    solicitante: ''
  };
  imges: any[] = [];
  //@ts-ignore
  myfile: File;


  constructor(private post: VisitaService, private local: LocalService, private messageService: MessageService,) {

  }
  ngOnInit(): void {
    this.post.getvisitasverificacion()
      .subscribe({
        next: async (resp) => {
          this.vistaverificacion = resp.visita;
          let conta=0;
         await this.vistaverificacion.forEach(item =>{
            if(item.visita_status=='SOLICITUD'){
              conta++;
            }
          }
          );
          this.visita_v=conta;
        },
        error: () => {

        }
      });
    this.post.getvisitasentregaequipo()
      .subscribe({
        next: (resp) => {
          this.vistaentregas = resp.visita;
          let conta=0;
          this.vistaentregas.forEach(item =>{
            if(item.visita_status=='SOLICITUD'){
              conta++;
            }
          }
          );
          this.vista_e=conta;
        },
        error: () => {

        }
      });
  }
  onRowSelect() {
    if(this.selectedProduct.visita_status=='SOLICITUD'){
      this.verifica = true;
    }
  }
  onRowSelect2() {
    if(this.selectedProduct.visita_status=='SOLICITUD'){
      this.entrega= true;
    }
  }
  async file(event: any, tipo: number) {
    this.myfile = event.target.files[0];
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile, tipo);
        //@ts-ignore
        document.getElementById("inputfile").value = "";
    }

  }
  getBase64(file: File, tipo: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if(tipo==10){
        this.imges.push({tipo: this.selecttipo['tipo'],file:reader.result + ''});
      }else{
        this.imges.push(reader.result + '');
      }
    };
    reader.onerror = (error) => {
    };
  }

  eliminarimg(i: number) {
    this.imges.splice(i, 1);
  }

  enviarinfo() {
    if (this.ingredient == '' || this.imges.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar la informacion solicitada' });
      return;
    }
    this.local.show();
    this.local.getPosition().then(pos => {
      this.post.enviarvisitaverificada(pos.lat, pos.lng, Number(this.ingredient), this.selectedProduct.id, this.imges).subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.verifica= false;
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
            setTimeout(() => {
               location.reload();
            }, 800);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: (e) => {
          this.local.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });

    }, (e) => {
      this.local.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'no Pudimos acceder a tu ubicacion, por favor autoriza la funcion en tu navegador' });
    });
  }
  enviarinfodos() {
    if (this.ingredient == '' || this.imges.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar la informacion solicitada' });
      return;
    }
    this.local.show();
    this.local.getPosition().then(pos => {
      this.post.enviarvisitaentregada(pos.lat, pos.lng, Number(this.ingredient), this.selectedProduct.id, this.imges).subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.entrega= false;
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
            setTimeout(() => {
               location.reload();
            }, 800);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: (e) => {
          this.local.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });

    }, (e) => {
      this.local.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'no Pudimos acceder a tu ubicacion, por favor autoriza la funcion en tu navegador' });
    });
    }
}
