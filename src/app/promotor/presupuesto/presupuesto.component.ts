import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/general.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { Proveedore } from '../../interfaces/productof.interface';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss'],
  providers: [MessageService]
})
export class PresupuestoComponent implements OnInit {
  estatus_solicitud:number = 0;
  salir: boolean=false;
  form: FormGroup = this.fb.group(
    {
      equipos: this.fb.array([])
    }
  );
  productos: Producto[] = [];
  proveedor:Proveedore[]=[];
  items: Producto[] = [];
  bindings: Producto[] =[];
  inversiontotal: number= 0;
  proveedor_id: Proveedore= {
    id: 0,
    nombre: '',
    rfc: '',
    razon_social: ''
  };

  constructor(private fb: FormBuilder,
              private post: SolicitudService,
              private messageService: MessageService,
              private router: Router,
              private auth: AuthService,
              private local: LocalService){
    
  }
  ngOnInit(): void {
    this.post.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp.productos;
      },
      error: () => { }
    });
    this.post.getproveedores().subscribe({
      next:(resp)=>{
        if(resp.code == 202 && resp.proveedores.length >= 1){
          this.proveedor= resp.proveedores;
          this.proveedor.unshift({
            id:0,
            nombre:'Seleccionar',
            rfc:'',
            razon_social:''});
        }
      }
    });
    if(this.local.equipos.length>=1){
      this.bindings= this.local.bindings;
      this.estatus_solicitud=this.local.estatus_solicitud;
      this.proveedor_id=this.local.proveedor_id;
      for(let i=0;i < this.local.equipos.length; i++){
        let primero = this.fb.group(
          {
            producto_id: [null,[Validators.required],],
            marca: [{ value: null, disabled: true },[Validators.required],],
            serie: [{ value: null, disabled: true },[Validators.required],],
            moneda_text: [{ value: null, disabled: true },[Validators.required],],
            modelo: [{ value: null, disabled: true },[Validators.required],],
            p_precio: [null,[Validators.required],],
            p_nombre: [{ value: null, disabled: false },[Validators.required],],
            // peso_valor: [{ value: null, disabled: false },[Validators.required],],
            cantidad: [null,[Validators.required],],
            moneda: [null,[Validators.required],],
           // iva: [{ value: null, disabled: true },[Validators.required],],
            descuento_porcentaje: [null,[Validators.required],],
            descuento_valor: [null,[Validators.required],],
            tipo_cambio: [null,[Validators.required],],
            comision_apertura: [null,[Validators.required],],
            seguro_equipo: [null,[Validators.required],],
            inversion_total: [{ value: null, disabled: true },[Validators.required],],
            precio_venta: [{ value: null, disabled: false },[Validators.required],],
            importe_final: [{ value: null, disabled: true },[Validators.required],],
            aportacion_producto_porcentaje: [null,[Validators.required],],
            aportacion_producto_valor: [null,[Validators.required],],
            importe_financiamiento_porcentaje: [{ value: null, disabled: true },[Validators.required],],
            importe_financiamiento_valor: [{ value: null, disabled: true },[Validators.required],],
            cotizacion: [{ value: null, disabled: true },[Validators.required],],
            comision_apertura_porcentaje: [3,[Validators.required],],
            cotizacion_total_porcentaje: [null,[Validators.required],],
          //  iva_porcentaje: [null,[Validators.required],],
            precio_venta_porcentaje: [null,[Validators.required],],
            monto_credito:[{ value: null, disabled: true },[Validators.required],],
          //  seguro_bien: [null,[Validators.required],],
            pago_inicial:[{ value: null, disabled: true },[Validators.required],],
          }
        );
        this.equipos.push(primero);        
        this.equipos.controls[i].reset(this.local.equipos[i]);
        //@ts-ignore
        this.equipos.controls[i]['controls'].moneda_text.setValue(this.local.equipos[i].moneda == 10 ? 'MXN' : 'USD');
        
        if(this.local.equipos[i].moneda ==10){
          //@ts-ignore
          this.equipos.controls[i]['controls'].tipo_cambio.setValue(0);
          //@ts-ignore
          this.equipos.controls[i]['controls'].tipo_cambio.disable();
        }
      }
    }else{
      this.bindings.push({
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
      });
      let primero = this.fb.group(
        {
            producto_id: [null,[Validators.required],],
            marca: [{ value: null, disabled: true },[Validators.required],],
            serie: [{ value: null, disabled: true },[Validators.required],],
            moneda_text: [{ value: null, disabled: true },[Validators.required],],
            modelo: [{ value: null, disabled: true },[Validators.required],],
            p_precio: [null,[Validators.required],],
            p_nombre: [{ value: null, disabled: false },[Validators.required],],
//             peso_valor: [{ value: null, disabled: false },[Validators.required],],
            cantidad: [null,[Validators.required],],
            moneda: [null,[Validators.required],],
           // iva: [{ value: null, disabled: true },[Validators.required],],
            descuento_porcentaje: [null,[Validators.required],],
            descuento_valor: [null,[Validators.required],],
            tipo_cambio: [null,[Validators.required],],
            comision_apertura: [null,[Validators.required],],
            seguro_equipo: [null,[Validators.required],],
            inversion_total: [{ value: null, disabled: true },[Validators.required],],
            precio_venta: [{ value: null, disabled: false },[Validators.required],],
            importe_final: [{ value: null, disabled: true },[Validators.required],],
            aportacion_producto_porcentaje: [null,[Validators.required],],
            aportacion_producto_valor: [null,[Validators.required],],
            importe_financiamiento_porcentaje: [{ value: null, disabled: true },[Validators.required],],
            importe_financiamiento_valor: [{ value: null, disabled: true },[Validators.required],],
            cotizacion: [{ value: null, disabled: true },[Validators.required],],
            comision_apertura_porcentaje: [3,[Validators.required],],
            cotizacion_total_porcentaje: [null,[Validators.required],],
          //  iva_porcentaje: [null,[Validators.required],],
            precio_venta_porcentaje: [null,[Validators.required],],
            monto_credito:[{ value: null, disabled: true },[Validators.required],],
          //  seguro_bien: [null,[Validators.required],],
            pago_inicial:[{ value: null, disabled: true },[Validators.required],],
        }
      );
      this.equipos.push(primero);
    }
  }
  get equipos() {
    return this.form.get("equipos") as FormArray;
  }
  selectproveedor(event: any) {
    this.proveedor_id = event.value;
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
  addproducto() {    
    this.bindings.push({
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
    });
    let primero = this.fb.group(
      {
            producto_id: [null,[Validators.required],],
            marca: [{ value: null, disabled: true },[Validators.required],],
            serie: [{ value: null, disabled: true },[Validators.required],],
            moneda_text: [{ value: null, disabled: true },[Validators.required],],
            modelo: [{ value: null, disabled: true },[Validators.required],],
            p_precio: [null,[Validators.required],],
            p_nombre: [{ value: null, disabled: false },[Validators.required],],
//             peso_valor: [{ value: null, disabled: false },[Validators.required],],
            cantidad: [null,[Validators.required],],
            moneda: [null,[Validators.required],],
           // iva: [{ value: null, disabled: true },[Validators.required],],
            descuento_porcentaje: [null,[Validators.required],],
            descuento_valor: [null,[Validators.required],],
            tipo_cambio: [null,[Validators.required],],
            comision_apertura: [null,[Validators.required],],
            seguro_equipo: [null,[Validators.required],],
            inversion_total: [{ value: null, disabled: true },[Validators.required],],
            precio_venta: [{ value: null, disabled: false },[Validators.required],],
            importe_final: [{ value: null, disabled: true },[Validators.required],],
            aportacion_producto_porcentaje: [null,[Validators.required],],
            aportacion_producto_valor: [null,[Validators.required],],
            importe_financiamiento_porcentaje: [{ value: null, disabled: true },[Validators.required],],
            importe_financiamiento_valor: [{ value: null, disabled: true },[Validators.required],],
            cotizacion: [{ value: null, disabled: true },[Validators.required],],
            comision_apertura_porcentaje: [3,[Validators.required],],
            cotizacion_total_porcentaje: [null,[Validators.required],],
          //  iva_porcentaje: [null,[Validators.required],],
            precio_venta_porcentaje: [null,[Validators.required],],
            monto_credito:[{ value: null, disabled: true },[Validators.required],],
          //  seguro_bien: [null,[Validators.required],],
            pago_inicial:[{ value: null, disabled: true },[Validators.required],],
      }
    );
    this.equipos.push(primero);
  }

  productoselect(event: string, i: number) {
    this.equipos.controls[i].reset();
    //@ts-ignore
    this.equipos.controls[i]['controls'].tipo_cambio.enable();

    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_financiamiento_porcentaje.setValue(100);
    //@ts-ignore
    this.equipos.controls[i]['controls'].comision_apertura_porcentaje.setValue(3);
    //@ts-ignore
    this.bindings[i] = this.productos.find(item => item.nombre.toLocaleLowerCase() == event.toLocaleLowerCase());
    //@ts-ignore
    this.equipos.controls[i]['controls'].p_nombre.setValue(this.bindings[i].nombre);
    //@ts-ignore
    this.equipos.controls[i]['controls'].marca.setValue(this.bindings[i].marca);
    //@ts-ignore
    this.equipos.controls[i]['controls'].modelo.setValue(this.bindings[i].modelo);
    //@ts-ignore
    this.equipos.controls[i]['controls'].serie.setValue(this.bindings[i].serie);
    //@ts-ignore
    this.equipos.controls[i]['controls'].moneda_text.setValue(this.bindings[i].moneda == 10 ? 'MXN' : 'USD');

    this.bindings[i].moneda_text=this.bindings[i].moneda == 10 ? 'MXN' : 'USD';
    //@ts-ignore
    this.equipos.controls[i]['controls'].moneda.setValue(this.bindings[i].moneda);
    //@ts-ignore
    this.equipos.controls[i]['controls'].p_precio.setValue(this.bindings[i].precio);
    //@ts-ignore
    this.equipos.controls[i]['controls'].producto_id.setValue(this.bindings[i].id);    
    //@ts-ignore
    if (this.equipos.controls[i]['controls'].moneda_text.value == 'MXN') {
      this.cambiomxn(i);
      //@ts-ignore
       this.equipos.controls[i]['controls'].tipo_cambio.disable();
      }
  }
  cambiomxn(i: number) {
    //@ts-ignore
this.equipos.controls[i]['controls'].precio_venta.setValue(this.bindings[i].precio);
//@ts-ignore
this.equipos.controls[i]['controls'].tipo_cambio.disable();
/*  if(this.bindings[i].apply_iva==10){
    //@ts-ignore
    this.equipos.controls[i]['controls'].iva.setValue(this.equipos.controls[i]['controls'].precio_venta.value * 0.16);
  }else{
    //@ts-ignore
    this.equipos.controls[i]['controls'].iva.setValue(0);
  }*/
  //@ts-ignore
  this.equipos.controls[i]['controls'].cantidad.setValue(1);
  //@ts-ignore
  this.equipos.controls[i]['controls'].tipo_cambio.setValue(0);
  //@ts-ignore
  // this.equipos.controls[i]['controls'].cotizacion.setValue((this.equipos.controls[i]['controls'].precio_venta.value + this.equipos.controls[i]['controls'].iva.value) * this.equipos.controls[i]['controls'].cantidad.value);
  this.equipos.controls[i]['controls'].cotizacion.setValue(this.equipos.controls[i]['controls'].precio_venta.value * this.equipos.controls[i]['controls'].cantidad.value);
  //@ts-ignore
  let p_venta = this.equipos.controls[i]['controls'].precio_venta.value / this.equipos.controls[i]['controls'].cotizacion.value;
  let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
    //@ts-ignore
    this.equipos.controls[i]['controls'].precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
   /* //@ts-ignore
    let p_iva = this.equipos.controls[i]['controls'].iva.value / this.equipos.controls[i]['controls'].cotizacion.value;
    const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
    //@ts-ignore
  this.equipos.controls[i]['controls'].iva_porcentaje.setValue(parseInt(iva_entero + ''));
  //@ts-ignore*/
  let p_coti = this.equipos.controls[i]['controls'].cotizacion.value / this.equipos.controls[i]['controls'].cotizacion.value * 100;
  //@ts-ignore
  this.equipos.controls[i]['controls'].cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
  this.cambiocantidad(i);

  }
  cambiodolar(i: number) {
  //@ts-ignore
this.equipos.controls[i]['controls'].precio_venta.setValue(this.bindings[i].precio * this.equipos.controls[i]['controls'].tipo_cambio.value);
//@ts-ignore
this.equipos.controls[i]['controls'].tipo_cambio.setValue(this.equipos.controls[i]['controls'].tipo_cambio.value);
/* if(this.bindings[i].apply_iva==10){
  //@ts-ignore
  this.equipos.controls[i]['controls'].iva.setValue(this.equipos.controls[i]['controls'].precio_venta.value * 0.16);
}else{
  //@ts-ignore
  this.equipos.controls[i]['controls'].iva.setValue(0);
}*/
//@ts-ignore
this.equipos.controls[i]['controls'].cantidad.setValue(1);
//@ts-ignore
//this.equipos.controls[i]['controls'].cotizacion.setValue((this.equipos.controls[i]['controls'].precio_venta.value + this.equipos.controls[i]['controls'].iva.value) * this.equipos.controls[i]['controls'].cantidad.value);
this.equipos.controls[i]['controls'].cotizacion.setValue(this.equipos.controls[i]['controls'].precio_venta.value * this.equipos.controls[i]['controls'].cantidad.value);
this.cambiocantidad(i);
  }
  cambiocantidad(i: number) {
    //@ts-ignore
  this.equipos.controls[i]['controls'].cotizacion.setValue(this.equipos.controls[i]['controls'].precio_venta.value * this.equipos.controls[i]['controls'].cantidad.value);
  //@ts-ignore
  // let dos = this.equipos.controls[i]['controls'].cotizacion.value *(this.equipos.controls[i]['controls'].comision_apertura_porcentaje.value / 100);
  //@ts-ignore
  // this.equipos.controls[i]['controls'].comision_apertura.setValue(dos);
  if(this.equipos.controls[i].valid){
    this.elresto(i);
  }
  return true;
  }
  async otromas(i:number) { 
    //@ts-ignore
     //this.equipos.controls[i]['controls'].cotizacion.setValue((this.equipos.controls[i]['controls'].precio_venta.value + this.equipos.controls[i]['controls'].iva.value) * this.equipos.controls[i]['controls'].cantidad.value);
     this.equipos.controls[i]['controls'].cotizacion.setValue(this.equipos.controls[i]['controls'].precio_venta.value * this.equipos.controls[i]['controls'].cantidad.value);
   //@ts-ignore
     let dos = this.equipos.controls[i]['controls'].importe_financiamiento_valor.value *(this.equipos.controls[i]['controls'].comision_apertura_porcentaje.value / 100);
     let iva_apertura= dos *0.16;
     let com_ap=dos+iva_apertura;
     //@ts-ignore
     this.equipos.controls[i]['controls'].comision_apertura.setValue(com_ap);
     this.elresto(i);
   }
   cambiocomsion(i: number) {
     //@ts-ignore
     let dos = (this.equipos.controls[i]['controls'].comision_apertura.value * 100) / this.equipos.controls[i]['controls'].importe_financiamiento_valor.value;
     //@ts-ignore
     this.equipos.controls[i]['controls'].comision_apertura_porcentaje.setValue(Number(dos.toFixed(2)));
     // this.elresto(i);
     // @ts-ignore
      let cua =this.equipos.controls[i]['controls'].seguro_equipo.value + this.equipos.controls[i]['controls'].comision_apertura.value + this.equipos.controls[i]['controls'].aportacion_producto_valor.value;
      //@ts-ignore
    this.equipos.controls[i]['controls'].pago_inicial.setValue(cua);
     }
  elresto(i: number) {
    // this.equipos.controls[i]['controls'].inversion_total.setValue((this.equipos.controls[i]['controls'].cotizacion.value + this.equipos.controls[i]['controls'].comision_apertura.value +this.equipos.controls[i]['controls'].seguro_bien.value +this.equipos.controls[i]['controls'].seguro_equipo.value)-this.equipos.controls[i]['controls'].descuento_valor.value);
    //@ts-ignore
    this.equipos.controls[i]['controls'].inversion_total.setValue((this.equipos.controls[i]['controls'].cotizacion.value +this.equipos.controls[i]['controls'].seguro_equipo.value)-this.equipos.controls[i]['controls'].descuento_valor.value);
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_final.setValue(this.equipos.controls[i]['controls'].inversion_total.value);
    //@ts-ignore
    let uno = (this.equipos.controls[i]['controls'].aportacion_producto_valor.value * 100) / this.equipos.controls[i]['controls'].importe_final.value;
    //@ts-ignore
    this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.setValue(Number(uno.toFixed(2)));
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_financiamiento_porcentaje.setValue(100 - this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.value);
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_financiamiento_valor.setValue(this.equipos.controls[i]['controls'].importe_final.value - this.equipos.controls[i]['controls'].aportacion_producto_valor.value);
    //@ts-ignore
    let p_venta = this.equipos.controls[i]['controls'].precio_venta.value / this.equipos.controls[i]['controls'].cotizacion.value;
    let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
    //@ts-ignore
    this.equipos.controls[i]['controls'].precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
   /* //@ts-ignore
    let p_iva = this.equipos.controls[i]['controls'].iva.value / this.equipos.controls[i]['controls'].cotizacion.value;
    const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
    //@ts-ignore
    this.equipos.controls[i]['controls'].iva_porcentaje.setValue(parseInt(iva_entero + ''));
    //@ts-ignore*/
    let p_coti = this.equipos.controls[i]['controls'].cotizacion.value / this.equipos.controls[i]['controls'].cotizacion.value * 100;
    //@ts-ignore
    this.equipos.controls[i]['controls'].cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
    //@ts-ignore
    let p_descuento = this.equipos.controls[i]['controls'].descuento_valor.value / this.equipos.controls[i]['controls'].cotizacion.value;
    const descuento_entero = Number(Number(p_descuento.toFixed(2)) * 100);
    //@ts-ignore
    this.equipos.controls[i]['controls'].descuento_porcentaje.setValue(parseInt(descuento_entero + ''));
    //@ts-ignore
   let tres =this.equipos.controls[i]['controls'].importe_final.value - this.equipos.controls[i]['controls'].aportacion_producto_valor.value ;
   //@ts-ignore
    this.equipos.controls[i]['controls'].monto_credito.setValue(tres);

    //@ts-ignore
     let dos = this.equipos.controls[i]['controls'].importe_financiamiento_valor.value *(this.equipos.controls[i]['controls'].comision_apertura_porcentaje.value / 100);
     let iva_apertura= dos *0.16;
     let com_ap=dos+iva_apertura;
     //@ts-ignore
     this.equipos.controls[i]['controls'].comision_apertura.setValue(com_ap);
    // @ts-ignore
    console.log('castos de contrtatcion',this.equipos.controls[i]['controls'].seguro_equipo.value);
    // @ts-ignore
    console.log('comisión por apertura',this.equipos.controls[i]['controls'].comision_apertura.value);
    // @ts-ignore
    console.log('enganche',this.equipos.controls[i]['controls'].aportacion_producto_valor.value);
    
    // @ts-ignore
    let cua =this.equipos.controls[i]['controls'].seguro_equipo.value + this.equipos.controls[i]['controls'].comision_apertura.value + this.equipos.controls[i]['controls'].aportacion_producto_valor.value;
    //@ts-ignore
  this.equipos.controls[i]['controls'].pago_inicial.setValue(cua);
  
  }
  importeaprtacion(i: number) {
  //@ts-ignore
  this.equipos.controls[i]['controls'].aportacion_producto_valor.setValue(this.equipos.controls[i]['controls'].importe_final.value * (this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.value / 100));
  //@ts-ignore
  this.equipos.controls[i]['controls'].importe_financiamiento_porcentaje.setValue(100 - this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.value);
  //@ts-ignore
  this.equipos.controls[i]['controls'].importe_financiamiento_valor.setValue(this.equipos.controls[i]['controls'].importe_final.value - this.equipos.controls[i]['controls'].aportacion_producto_valor.value);
  //@ts-ignore
  let p_venta = this.equipos.controls[i]['controls'].precio_venta.value / this.equipos.controls[i]['controls'].cotizacion.value;
  let p_venta_entero = Number(p_venta.toFixed(2)) * 100;
  //@ts-ignore
  this.equipos.controls[i]['controls'].precio_venta_porcentaje.setValue(parseInt(p_venta_entero + ''));
/*  //@ts-ignore
  let p_iva = this.equipos.controls[i]['controls'].iva.value / this.equipos.controls[i]['controls'].cotizacion.value;
  const iva_entero = Number(Number(p_iva.toFixed(2)) * 100);
  //@ts-ignore
  this.equipos.controls[i]['controls'].iva_porcentaje.setValue(parseInt(iva_entero + ''));
  //@ts-ignore*/
  let p_coti = this.equipos.controls[i]['controls'].cotizacion.value / this.equipos.controls[i]['controls'].cotizacion.value * 100;
  //@ts-ignore
  this.equipos.controls[i]['controls'].cotizacion_total_porcentaje.setValue(parseInt(p_coti + ''));
  //@ts-ignore
  let p_descuento = this.equipos.controls[i]['controls'].descuento_valor.value / this.equipos.controls[i]['controls'].cotizacion.value;
  const descuento_entero = Number(Number(p_descuento.toFixed(2)) * 100);
  //@ts-ignore
  this.equipos.controls[i]['controls'].descuento_porcentaje.setValue(parseInt(descuento_entero + ''));
  //@ts-ignore
  let tres =this.equipos.controls[i]['controls'].importe_final.value - this.equipos.controls[i]['controls'].aportacion_producto_valor.value ;
  //@ts-ignore
  this.equipos.controls[i]['controls'].monto_credito.setValue(tres);
   //@ts-ignore
   let dos = this.equipos.controls[i]['controls'].importe_financiamiento_valor.value *(this.equipos.controls[i]['controls'].comision_apertura_porcentaje.value / 100);
   let iva_apertura= dos *0.16;
   let com_ap=dos+iva_apertura;
   //@ts-ignore
   this.equipos.controls[i]['controls'].comision_apertura.setValue(com_ap);
    // @ts-ignore
    let cua =this.equipos.controls[i]['controls'].seguro_equipo.value + this.equipos.controls[i]['controls'].comision_apertura.value + this.equipos.controls[i]['controls'].aportacion_producto_valor.value;
    //@ts-ignore
  this.equipos.controls[i]['controls'].pago_inicial.setValue(cua);
  }
  alrevez(i: number) {
  // @ts-ignore
  let uno = (this.equipos.controls[i]['controls'].aportacion_producto_valor.value * 100) / this.equipos.controls[i]['controls'].importe_final.value;
  // @ts-ignore
  this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.setValue(Number(uno.toFixed(2)));
  // @ts-ignore
  this.equipos.controls[i]['controls'].importe_financiamiento_porcentaje.setValue(100 - this.equipos.controls[i]['controls'].aportacion_producto_porcentaje.value);
  //  let si = await this.cambiocantidad(i);
   this.elresto(i);
  }
  resultados() {
   for(let i =0; i< this.equipos.controls.length;i++){
    
    //this.equipos.controls[i]['controls'].iva.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].comision_apertura.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].inversion_total.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].precio_venta.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_final.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_financiamiento_porcentaje.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].importe_financiamiento_valor.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].cotizacion.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].modelo.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].marca.enable();
    //@ts-ignore
    this.equipos.controls[i]['controls'].serie.enable();
        //@ts-ignore
    this.equipos.controls[i]['controls'].monto_credito.enable();
    
   // this.equipos.controls[i]['controls'].seguro_bien.enable();
            //@ts-ignore
    this.equipos.controls[i]['controls'].pago_inicial.enable();
   }

    
    if (this.equipos.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return Object.values(this.equipos.controls).forEach(control =>{
        control.markAllAsTouched();
      });
    }
    
    if(this.proveedor_id.id ==0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Selecciona un Proveedor' });
      return;
    }
    for(let i =0; i< this.equipos.controls.length;i++){
      //@ts-ignore
      this.equipos.controls[i]['controls'].tipo_cambio.enable();
    }
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
      return;
    }
    let finalarry: any[]=[];
    Object.values(this.equipos.controls).forEach(control =>{
      finalarry.push(control.value);      
    });
    Object.values(this.equipos.controls).forEach(control =>{
      //@ts-ignore
    this.inversiontotal= this.inversiontotal+ control['controls'].importe_financiamiento_valor.value;
    });
    this.local.show();
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 20, presupuesto: finalarry ,proveedor_id: this.proveedor_id.id}).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          this.local.bindings = this.bindings;
          this.local.equipos = finalarry;
          this.local.inversiontotal= this.inversiontotal;
          this.local.proveedor_id=this.proveedor_id;
          if(this.salir){
            this.router.navigate(['/promotor']);
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
  eliminarpresupuesto(i: number) {
    this.bindings.pop();
    this.equipos.controls.pop();
    this.alrevez(i-1);
    }
    guardasale() {
      this.salir= true;
      this.resultados();
      }
}
