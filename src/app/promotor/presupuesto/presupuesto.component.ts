import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Producto } from 'src/app/interfaces/general.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss'],
  providers: [MessageService]
})
export class PresupuestoComponent implements OnInit {

  estatus_solicitud:number = 0;
  salir: boolean=false;
  productos: Producto[] = [];
  items: Producto[] = [];
  presupuestoForm: FormGroup;
  producto_id: AbstractControl;
  comision_apertura_porcentaje: AbstractControl;
  cotizacion_total_porcentaje: AbstractControl;
  iva_porcentaje: AbstractControl;
  precio_venta_porcentaje: AbstractControl;
  cantidad: AbstractControl;
  moneda: AbstractControl;
  iva: AbstractControl;
  tipo_cambio: AbstractControl;
  comision_apertura: AbstractControl;
  seguro_equipo: AbstractControl;
  inversion_total: AbstractControl;
  descuento_porcentaje: AbstractControl;
  descuento_valor: AbstractControl;
  precio_venta: AbstractControl;
  importe_final: AbstractControl;
  aportacion_producto_porcentaje: AbstractControl;
  aportacion_producto_valor: AbstractControl;
  importe_financiamiento_porcentaje: AbstractControl;
  importe_financiamiento_valor: AbstractControl;
  cotizacion: AbstractControl;
  monedas: string = '';
  //@ts-ignore
  peso_valor: number = null;
  binding: Producto = {
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

  constructor(private post: PostService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private auth: AuthService,
    private router: Router,
    private local: LocalService) {
    this.presupuestoForm = this.formBuilder.group({
      producto_id: [
        null,
        [
          Validators.required
        ],
      ],
      cantidad: [
        null,
        [
          Validators.required
        ],
      ],
      moneda: [
        null,
        [
          Validators.required
        ],
      ],
      iva: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      descuento_porcentaje: [
        null,
        [
          Validators.required
        ],
      ],
      descuento_valor: [
        null,
        [
          Validators.required
        ],
      ],
      tipo_cambio: [
        null,
        [
          Validators.required
        ],
      ],
      comision_apertura: [
        null,
        [
          Validators.required
        ],
      ],
      seguro_equipo: [
        null,
        [
          Validators.required
        ],
      ],
      inversion_total: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      precio_venta: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      importe_final: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      aportacion_producto_porcentaje: [
        null,
        [
          Validators.required
        ],
      ],
      aportacion_producto_valor: [
        null,
        [
          Validators.required
        ],
      ],
      importe_financiamiento_porcentaje: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      importe_financiamiento_valor: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      cotizacion: [
        { value: null, disabled: true },
        [
          Validators.required
        ],
      ],
      comision_apertura_porcentaje: [
        3,
        [
          Validators.required
        ],
      ],
      cotizacion_total_porcentaje: [
        null,
        [
          Validators.required
        ],
      ],
      iva_porcentaje: [
        null,
        [
          Validators.required
        ],
      ],
      precio_venta_porcentaje: [
        null,
        [
          Validators.required
        ],
      ],
    });
    this.producto_id = this.presupuestoForm.controls['producto_id'];
    this.cantidad = this.presupuestoForm.controls['cantidad'];
    this.moneda = this.presupuestoForm.controls['moneda'];
    this.iva = this.presupuestoForm.controls['iva'];
    this.tipo_cambio = this.presupuestoForm.controls['tipo_cambio'];
    this.comision_apertura = this.presupuestoForm.controls['comision_apertura'];
    this.seguro_equipo = this.presupuestoForm.controls['seguro_equipo'];
    this.inversion_total = this.presupuestoForm.controls['inversion_total'];
    this.precio_venta = this.presupuestoForm.controls['precio_venta'];
    this.importe_final = this.presupuestoForm.controls['importe_final'];
    this.descuento_porcentaje = this.presupuestoForm.controls['descuento_porcentaje'];
    this.descuento_valor = this.presupuestoForm.controls['descuento_valor'];
    this.aportacion_producto_porcentaje = this.presupuestoForm.controls['aportacion_producto_porcentaje'];
    this.aportacion_producto_valor = this.presupuestoForm.controls['aportacion_producto_valor'];
    this.importe_financiamiento_porcentaje = this.presupuestoForm.controls['importe_financiamiento_porcentaje'];
    this.importe_financiamiento_valor = this.presupuestoForm.controls['importe_financiamiento_valor'];
    this.cotizacion = this.presupuestoForm.controls['cotizacion'];
    this.comision_apertura_porcentaje = this.presupuestoForm.controls['comision_apertura_porcentaje'];
    this.cotizacion_total_porcentaje = this.presupuestoForm.controls['cotizacion_total_porcentaje'];
    this.iva_porcentaje = this.presupuestoForm.controls['iva_porcentaje'];
    this.precio_venta_porcentaje = this.presupuestoForm.controls['precio_venta_porcentaje'];
  }


  ngOnInit(): void {
    if (this.local.presupuesto_info != null) {
      this.binding = this.local.binding;
      this.peso_valor = this.local.presupuesto_info['tipo_cambio'];
      this.monedas = this.binding.moneda == 10 ? 'MXN' : 'USD';
      this.presupuestoForm.reset(this.local.presupuesto_info);
      this.producto_id.setValue(Number(this.binding.id));
      this.estatus_solicitud=this.local.estatus_solicitud;
    }
    this.post.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp.productos;
      },
      error: () => { }
    });
  }
  filterItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.productos.length; i++) {
      let item = this.productos[i].nombre;
      if (item.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(item);
      }
    }
    this.items = filtered;
  }
  productoselect(event: string) {
    this.presupuestoForm.reset();
    this.importe_financiamiento_porcentaje.setValue(100);
    this.comision_apertura_porcentaje.setValue(3);
    //@ts-ignore
    this.binding = this.productos.find(item => item.nombre.toLocaleLowerCase() == event.toLocaleLowerCase());
    this.monedas = this.binding.moneda == 10 ? 'MXN' : 'USD';
    this.moneda.setValue(this.binding.moneda);
    this.producto_id.setValue(this.binding.id);    
    if (this.monedas == 'MXN') {
      this.cambiomxn();
    }
  }
  cambiomxn() {
    this.precio_venta.setValue(this.binding.precio);
      this.tipo_cambio.disable();
      if(this.binding.apply_iva==10){
        this.iva.setValue(this.precio_venta.value * 0.16);
      }else{
        this.iva.setValue(0);
      }
      this.cantidad.setValue(1);
      this.tipo_cambio.setValue(0);
      this.cotizacion.setValue((this.precio_venta.value + this.iva.value) * this.cantidad.value);
      let p_venta = this.precio_venta.value / this.cotizacion.value;
      let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
      this.precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
      let p_iva = this.iva.value / this.cotizacion.value;
      const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
      this.iva_porcentaje.setValue(parseInt(iva_entero + ''));
      let p_coti = this.cotizacion.value / this.cotizacion.value * 100;
      this.cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
      this.cambiocantidad();
  }

  cambiodolar() {
    this.precio_venta.setValue(this.binding.precio * this.peso_valor);
    this.tipo_cambio.setValue(this.peso_valor);
    if(this.binding.apply_iva==10){
      this.iva.setValue(this.precio_venta.value * 0.16);
    }else{
      this.iva.setValue(0);
    }
    this.cantidad.setValue(1);
    this.cotizacion.setValue((this.precio_venta.value + this.iva.value) * this.cantidad.value);
    this.cambiocantidad();
    }
    cambiocantidad() {
      this.cotizacion.setValue((this.precio_venta.value + this.iva.value) * this.cantidad.value);
      // let uno = this.cotizacion.value *(this.importe_financiamiento_porcentaje.value/100);
      let dos = this.cotizacion.value *(this.comision_apertura_porcentaje.value / 100);
      this.comision_apertura.setValue(dos);
      if(this.presupuestoForm.valid){
        this.elresto();
      }
      return true;
      }
      async otromas() {    
       // this.importe_financiamiento_porcentaje.setValue(100 - this.aportacion_producto_porcentaje.value);
        this.cotizacion.setValue((this.precio_venta.value + this.iva.value) * this.cantidad.value);
      // let uno = this.cotizacion.value *(this.importe_financiamiento_porcentaje.value/100);
        let dos = this.cotizacion.value *(this.comision_apertura_porcentaje.value / 100);
        this.comision_apertura.setValue(dos);
        this.elresto();
      }
      cambiocomsion() {
       /* this.importe_financiamiento_porcentaje.setValue(100 - this.aportacion_producto_porcentaje.value);
        let uno = this.comision_apertura.value / 1.16;
        let dos = (uno / this.importe_financiamiento_valor.value) * 100;*/
        let dos = (this.comision_apertura.value * 100) / this.cotizacion.value;        
        this.comision_apertura_porcentaje.setValue(dos.toFixed(2));
        this.elresto();
        }
      elresto(){
        this.inversion_total.setValue((this.cotizacion.value + this.comision_apertura.value + this.seguro_equipo.value)-this.descuento_valor.value);
        this.importe_final.setValue(this.inversion_total.value);
        let uno = (this.aportacion_producto_valor.value * 100) / this.importe_final.value;
        this.aportacion_producto_porcentaje.setValue(uno.toFixed(2));
        this.importe_financiamiento_porcentaje.setValue(100 - this.aportacion_producto_porcentaje.value);
        // this.aportacion_producto_valor.setValue(this.importe_final.value * (this.aportacion_producto_porcentaje.value / 100));
        this.importe_financiamiento_valor.setValue(this.importe_final.value - this.aportacion_producto_valor.value);
        let p_venta = this.precio_venta.value / this.cotizacion.value;
        let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
        this.precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
        let p_iva = this.iva.value / this.cotizacion.value;
        const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
        this.iva_porcentaje.setValue(parseInt(iva_entero + ''));
        let p_coti = this.cotizacion.value / this.cotizacion.value * 100;
        this.cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
        let p_descuento = this.descuento_valor.value / this.cotizacion.value;
        const descuento_entero = Number(Number(p_descuento.toFixed(2)) * 100);
        this.descuento_porcentaje.setValue(parseInt(descuento_entero + ''));
      }
      async importeaprtacion(){
         this.aportacion_producto_valor.setValue(this.importe_final.value * (this.aportacion_producto_porcentaje.value / 100));
         this.importe_financiamiento_porcentaje.setValue(100 - this.aportacion_producto_porcentaje.value);
         this.importe_financiamiento_valor.setValue(this.importe_final.value - this.aportacion_producto_valor.value);
        let p_venta = this.precio_venta.value / this.cotizacion.value;
        let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
        this.precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
        let p_iva = this.iva.value / this.cotizacion.value;
        const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
        this.iva_porcentaje.setValue(parseInt(iva_entero + ''));
        let p_coti = this.cotizacion.value / this.cotizacion.value * 100;
        this.cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
        let p_descuento = this.descuento_valor.value / this.cotizacion.value;
        const descuento_entero = Number(Number(p_descuento.toFixed(2)) * 100);
        this.descuento_porcentaje.setValue(parseInt(descuento_entero + ''));
      }
      async alrevez() {
        let uno = (this.aportacion_producto_valor.value * 100) / this.importe_final.value;
        this.aportacion_producto_porcentaje.setValue(uno.toFixed(2));
        this.importe_financiamiento_porcentaje.setValue(100 - this.aportacion_producto_porcentaje.value);
        let si = await this.cambiocantidad();
         this.elresto();
      }


  resultados() {
    this.presupuestoForm.controls['iva'].enable();
    this.presupuestoForm.controls['comision_apertura'].enable();
    this.presupuestoForm.controls['inversion_total'].enable();
    this.presupuestoForm.controls['precio_venta'].enable();
    this.presupuestoForm.controls['importe_final'].enable();
    this.presupuestoForm.controls['importe_financiamiento_porcentaje'].enable();
    this.presupuestoForm.controls['importe_financiamiento_valor'].enable();
    this.presupuestoForm.controls['cotizacion'].enable();
    
    if (this.presupuestoForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return;
    }
    this.presupuestoForm.controls['tipo_cambio'].enable();

    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
      return;
    }
    this.local.show();
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 20, presupuesto: this.presupuestoForm.value }).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          this.local.binding = this.binding;
          this.local.presupuesto_info = this.presupuestoForm.value;
          if(this.salir){
            this.router.navigate(['/promotor/promotor/']);
          }else{
            this.router.navigate(['/promotor/originacion/terminos']);
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
    this.resultados();
    }
}
