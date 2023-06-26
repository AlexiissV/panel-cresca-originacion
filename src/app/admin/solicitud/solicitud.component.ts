import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { SolicitudDetail } from 'src/app/interfaces/general.interface';
import { Group } from '../../interfaces/general.interface';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  Cuestionario: Group[]=[];
  list_Meses:string[]=[
    '',
    'Mensual',
    'Trimestal',
    'Semestral',
    'Anual',
    'Al Vencimiento',
  ];
  detalle_solicitud:SolicitudDetail={
    'cuestionario-identificacion': [{
      groups:[]
    }],
    presupuesto: [
      {
        cantidad:0,
moneda:0,
iva:0,
iva_porcentaje:0,
cotizacion:0,
cotizacion_total_porcentaje:0,
tipo_cambio:0,
comision_apertura:0,
comision_apertura_porcentaje:0,
seguro_equipo:0,
inversion_total:0,
precio_venta:0,
precio_venta_porcentaje:0,
descuento_porcentaje:0,
descuento_valor:0,
importe_final:0,
aportacion_producto_porcentaje:0,
aportacion_producto_valor:0,
importe_financiamiento_porcentaje:0,
importe_financiamiento_valor:0,
        producto:{
          id: 0,
          apply_iva: 0,
          clave: '',
          nombre: '',
          marca: '',
          modelo: '',
          serie: '',
          precio: 0,
          moneda: 0,
          moneda_text: ''
        }
      }
    ],
    capacidad_id: 0,
    termino_credito: [],
    capacidad: [{
      groups:[]
    }],
    expediente_digital: {
      generales: [],
      capacidad: []
    },
    tabla_amortizacion: []
  };

  constructor(private active: ActivatedRoute, private post: PostService, private local: LocalService) {
  }
  ngOnInit(): void {
    this.local.show();
    this.post.getdetallesolicitud(Number(this.active.snapshot.paramMap.get('id'))).subscribe({
      next: async (resp) => {
        await this.local.hide();
        this.detalle_solicitud= resp.solicitud_detail;
        this.Cuestionario = resp.solicitud_detail['cuestionario-identificacion'][0].groups
        
      },
      error: async (e) => {
        await this.local.hide();
      }
    });
  }


}
