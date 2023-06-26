import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Solicitud } from 'src/app/interfaces/general.interface';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  solicitudes: Solicitud[] = [];
  selectedProduct: Solicitud = {
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
    operador: ''
  };
  

  constructor(private post: PostService,
    private local: LocalService,
    private router: Router) { }

  ngOnInit(): void {
    this.post.getSolicitudes().subscribe({
      next: (resp) => {
        this.solicitudes = resp.solicitudes;
      },
      error: (e) => {

      }
    });;
  }

  async onRowSelect(event: any) {
    await this.local.show();
    this.post.getdetallesolicitud(event.data['id']).subscribe({
      next: async (resp) => {
        this.local.solicitud_id = Number(event.data['id']);
        this.local.estatus_solicitud = Number(event.data['status']);
        this.local.Cuestionario = resp.solicitud_detail['cuestionario-identificacion'][0]['groups'];
        this.local.doc_general = resp.solicitud_detail.expediente_digital.generales;
        if (resp.solicitud_detail.presupuesto[0].iva != null) {
          this.local.presupuesto_info = resp.solicitud_detail.presupuesto[0];
          this.local.binding = resp.solicitud_detail.presupuesto[0].producto;
        }
        if (resp.solicitud_detail.termino_credito[0].importe_credito != null) {
          this.local.terminos_credito = resp.solicitud_detail.termino_credito[0];
          this.local.tabla_amortizacion = resp.solicitud_detail.tabla_amortizacion;
        }
        if (resp.solicitud_detail.capacidad.length >= 1) {
          this.local.capacidad_info = resp.solicitud_detail.capacidad[0].groups;
          this.local.capacidad_id = resp.solicitud_detail.capacidad_id;
          this.local.doc_finaciero = resp.solicitud_detail.expediente_digital.capacidad;
        }
        await this.local.hide();
        this.router.navigate(['/promotor/originacion/informacion']);
      },
      error: async (e) => {
        await this.local.hide();
      }
    });
  }

  resetlocal() {
    this.local.Cuestionario = [];
    this.local.binding = {
      id: 0,
      clave: '',
      nombre: '',
      marca: '',
      modelo: '',
      serie: '',
      precio: 0,
      moneda: 0,
      moneda_text: '',
      apply_iva: 0
    };
    this.local.presupuesto_info = null;
    this.local.terminos_credito = null;
    this.local.tabla_amortizacion = [];
    this.local.capacidad_id = null;
    this.local.capacidad_info = null;
    this.local.doc_general = [];
    this.local.estatus_solicitud=0;
    //@ts-ignore
    this.local.solicitud_id=null;
    this.local.doc_finaciero = [];
    this.router.navigate(['/promotor/originacion']);
  }
}
