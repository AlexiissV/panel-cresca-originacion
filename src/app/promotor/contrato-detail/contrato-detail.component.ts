import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { Solicitud } from '../../interfaces/general.interface';
import { MessageService } from 'primeng/api';
import { ContratoService } from '../../services/contrato.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.scss'],
  providers: [MessageService]
})
export class ContratoDetailComponent implements OnInit {
  minimo:Date= new Date();
  Mipipe = new DatePipe('en-US');
  info: Solicitud = {
    id: 0,
    empresa_id: 0,
    empresa: '',
    producto_id: 0,
    producto: '',
    producto_financiero: '',
    cantidad: 0,
    cotizacion: 0,
    inversion_total: 0,
    descuento_valor: 0,
    importe_final: 0,
    aportacion_producto_valor: 0,
    importe_financiamiento_valor: 0,
    status: 0,
    status_text: '',
    registro: '',
    modificado: '',
    operador_id: 0,
    operador: '',
    solicitante: '',
    presupuestos: [],
    capacidad_id: 0
  };
  contratobase64: string = '';
  pagarebase64: string = '';
  fecha: Date | undefined;
  //@ts-ignore
  myfile: File;
  dwcontrato: string = '';
  dwpagare: string = '';
  dwavisoPrivacidad:      string ='';
  dwtarjetaFirmas:        string ='';
  dwSolicitudCredito:     string ='';
  dwSolicitudDisposicion: string ='';
  dwPld:                  string ='';
  dwBuroCredito:          string ='';
  activeIndex: number = 0;

  constructor(private local: LocalService,
    private router: Router,
    private messageService: MessageService,
    private post: ContratoService) {

  }
  ngOnInit(): void {
    let algo = localStorage.getItem('info');
    if (algo != null) {
      this.info = JSON.parse(algo);
      if (this.info.status == 40) {
        this.activeIndex = 1;
        this.descargardocscontrato();
      }
      if (this.info.status == 46) {
        this.activeIndex = 2;
        
      }
    } else {
      this.router.navigate(['promotor/contratos']);
    }
  }

  async filexml(event: any, tipo: number,i:number) {

    if(event.target.files[0].type!='text/xml'){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'el formato del archivo debe ser un XML' });
      return;
    }
    this.myfile = event.target.files[0];
    
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile, tipo,i);
    }

  }
  async file(event: any, tipo: number) {    
    if(event.target.files[0].type!='application/pdf'){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'el formato del archivo debe ser un PDF' });
      return;
    }
    this.myfile = event.target.files[0];
    
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile, tipo);
    }

  }
  getBase64(file: File, tipo: number, i?: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      switch (tipo) {
        case 10:
          //@ts-ignore
          this.info.presupuestos[i].xml = reader.result + '';
          break;
        case 20:
          this.contratobase64 = reader.result + '';
          break;
        case 30:
          this.pagarebase64 = reader.result + '';
          break;
        default:
          break;
      }
    };
    reader.onerror = (error) => {
    };
  }

  descargarcontrato(url: string) {
    let win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    //@ts-ignore
      win.focus();

   /* var link = document.createElement("a");
    link.download = `contrato.pdf`;
    link.href = this.dwcontrato;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
  }
  descargarpagare() {
   //  let win = window.open(this.dwpagare, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    // @ts-ignore
    //  win.focus();
      /*
    var link = document.createElement("a");
    link.download = `pagare.pdf`;
    link.href = this.dwpagare;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
    //@ts-ignore
    this.descargardocspagare(this.Mipipe.transform(this.fecha,'yyyy-MM-dd'));
    
  }

  enviarFactura() {
    let bandera:boolean = false;
    this.info.presupuestos.forEach((item)=>{
      if(item.xml== null || item.xml== undefined){
        bandera=true;
      }
    })
    if(bandera){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar el archivo antes de enviarlo' });
      return;
    }
    let detail=[];
    for(let uno of this.info.presupuestos){
      let data ={
        presupuesto_id: uno.presupuesto_id,
        factura: uno.xml
      }
      detail.push(data);
    }
    this.local.show();
    this.post.postenviarfactura(this.info.id,detail)
      .subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail:resp.message });
            setTimeout(() => {
              this.router.navigate(['/promotor/contratos']);
            }, 700);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: () => {
          this.local.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });
  }

  enviarcontrato() {
    if (this.contratobase64 == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar el archivo antes de enviarlo' });
      return;
    }
    this.local.show();
    this.post.postloadcontrato(this.info.id, this.contratobase64)
      .subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail:resp.message });
            setTimeout(() => {
              this.router.navigate(['/promotor/contratos']);
            }, 700);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: () => {
          this.local.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });
  }
  enviarpagare() {
    if (this.pagarebase64 == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar el archivo antes de enviarlo' });
      return;
    }
    this.local.show();
    this.post.postloadpagare(this.info.id, this.pagarebase64)
      .subscribe({
        next: (resp) => {
          this.local.hide();
          if (resp.code == 202) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail:resp.message });
            setTimeout(() => {
              this.router.navigate(['/promotor/contratos']);
            }, 700);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
          }
        },
        error: () => {
          this.local.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });
  }
  seccionselect(event: any) {
    if (event['index'] == 1) {
      this.descargardocscontrato();
    }
    if (event['index'] == 2) {
    }
  }
  descargardocspagare(fecha: string) {
    this.local.show();
    this.post.getfilepagare(this.info.id,fecha,this.info.capacidad_id).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          this.dwpagare = resp.pagare+'';
          this.descargararchivo();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: () => {
        this.local.hide();
      }
    });

  }
  descargararchivo() {
      let win = window.open(this.dwpagare, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    // @ts-ignore
     win.focus();
      /*
    var link = document.createElement("a");
    link.download = `pagare.pdf`;
    link.href = this.dwpagare;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
  }
  descargardocscontrato() {
    this.post.getfilecontrato(this.info.id,this.info.capacidad_id).subscribe({
      next: (resp) => {
        if (resp.code == 202) {
          this.dwcontrato = resp.contrato+'';
          this.dwavisoPrivacidad = resp.formatoavisoPrivacidad;
          this.dwtarjetaFirmas = resp.formatotarjetaFirmas;
          this.dwSolicitudCredito = resp.formatoSolicitudCredito;
          this.dwSolicitudDisposicion = resp.formatoSolicitudDisposicion;
          this.dwPld = resp.formatoPld;
          this.dwBuroCredito = resp.formatoBuroCredito;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: () => {

      }
    });
  }
}
