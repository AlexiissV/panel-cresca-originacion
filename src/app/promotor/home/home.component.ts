import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Solicitud, formNufi } from 'src/app/interfaces/general.interface';
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
    operador: '',
    solicitante: '',
    presupuestos: [],
    capacidad_id: 0
  };
  restu : formNufi = {
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
    let id= event.data['id'];
    this.post.getdetallesolicitud(id).subscribe({
      next: async (resp) => {
        this.local.solicitud_id = Number(event.data['id']);
        this.local.estatus_solicitud = Number(event.data['status']);
        this.local.Cuestionario = resp.solicitud_detail['cuestionario-identificacion'][0]['groups'];
        this.local.doc_general = resp.solicitud_detail.expediente_digital.generales;
        this.local.formsolicitante = resp.solicitud_detail.solicitante;
        this.local.formrepresentante = {...resp.solicitud_detail.legal,is_aval:(resp.solicitud_detail.legal.apply_legal_condicional==10)?true:false};
        this.local.formsaval = resp.solicitud_detail.aval;
        if (resp.solicitud_detail.presupuesto.length>=1) {
          this.local.equipos = resp.solicitud_detail.presupuesto;
          this.local.proveedor_id= resp.solicitud_detail.proveedor_id;
          let inversion=0;
          this.local.equipos.forEach(item=>{
            inversion= inversion+Number(item['importe_financiamiento_valor']);
          });
          this.local.inversiontotal= inversion;
          this.local.bindings = resp.solicitud_detail.producto;
        }
        if(resp.solicitud_detail.file_sic!=null){
          this.local.file_sic = resp.solicitud_detail.file_sic;
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
    this.local.bindings = []
    this.local.formsolicitante = this.restu;
    this.local.formrepresentante = this.restu;
    this.local.formsaval = this.restu;
    this.local.equipos = [];
    this.local.terminos_credito = null;
    this.local.tabla_amortizacion = [];
    this.local.capacidad_id = null;
    this.local.capacidad_info = null;
    this.local.doc_general = [];
    this.local.estatus_solicitud=0;
    //@ts-ignore
    this.local.solicitud_id=0;
    this.local.doc_finaciero = [];
    this.router.navigate(['/promotor/originacion']);
  }
}
