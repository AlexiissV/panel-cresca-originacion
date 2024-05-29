import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { SolicitudDetail } from '../../interfaces/general.interface';
import { Group } from '../../interfaces/general.interface';
import { TablaAmortizacion } from '../../interfaces/productof.interface';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  bandera: boolean= false;
  Cuestionario: Group[]=[];
  tabla: TablaAmortizacion[] = [];
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
      groups: []
    }],
    presupuesto: [
      {
        cantidad: 0,
        moneda: 0,
        iva: 0,
        iva_porcentaje: 0,
        cotizacion: 0,
        cotizacion_total_porcentaje: 0,
        tipo_cambio: 0,
        comision_apertura: 0,
        comision_apertura_porcentaje: 0,
        seguro_equipo: 0,
        inversion_total: 0,
        precio_venta: 0,
        precio_venta_porcentaje: 0,
        descuento_porcentaje: 0,
        descuento_valor: 0,
        importe_final: 0,
        aportacion_producto_porcentaje: 0,
        aportacion_producto_valor: 0,
        importe_financiamiento_porcentaje: 0,
        importe_financiamiento_valor: 0,
        producto_id: 0
      }
    ],
    capacidad_id: 0,
    termino_credito: [
      {
        importe_credito: 0,
        plazo_credito: 0,
        taza_fija_anual: 0,
        garantias: '',
        forma_disposicion: '',
        fecha_estimada_otorgamiento: '',
        forma_pago_capital_mes: '',
        forma_pago_capital: '',
        forma_pago_interes: '',
        forma_pago_interes_mes: '',
      }
    ],
    capacidad: [{
      groups: []
    }],
    expediente_digital: {
      generales: [],
      capacidad: []
    },
    tabla_amortizacion: [],
    solicitante: {
      curp: '',
      fecha_nacimiento: '',
      entidad: '',
      tipo_persona: '',
      sexo: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      correo: '',
      telefono: '',
      img_frente: '',
      img_reverso: '',
      reporte_id: '',
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
    },
    legal: {
      curp: '',
      fecha_nacimiento: '',
      entidad: '',
      tipo_persona: '',
      sexo: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      correo: '',
      telefono: '',
      img_frente: '',
      img_reverso: '',
      reporte_id: '',
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
    },
    aval: [],
    file_sic: '',
    producto: [],
    proveedor_id: {
      id: 0,
      nombre: '',
      rfc: '',
      razon_social: ''
    }
  };

  constructor(private active: ActivatedRoute, private post: PostService, private local: LocalService) {
  }
  ngOnInit(): void {
    this.local.show();
    this.post.getdetallesolicitud(Number(this.active.snapshot.paramMap.get('id'))).subscribe({
      next: async (resp) => {
        this.detalle_solicitud= resp.solicitud_detail;
        this.Cuestionario = resp.solicitud_detail['cuestionario-identificacion'][0].groups;
        this.tabla= resp.solicitud_detail.tabla_amortizacion;
        await this.local.hide();
        this.bandera=true;
      },
      error: async (e) => {
        await this.local.hide();
      }
    });
  }


}
