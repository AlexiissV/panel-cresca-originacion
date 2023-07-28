import { Injectable } from '@angular/core';
import { Group, Producto, RestInfoLogin, arraydocs, formNufi } from '../interfaces/general.interface';
import { TablaAmortizacion } from '../interfaces/productof.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  isloader: boolean= false;
  barra:boolean=false;
  //@ts-ignore
  solicitud_id:number = null;
  estatus_solicitud:number = 0;
  empresa:RestInfoLogin ={
    code: 0,
    name: '',
    empresa_logo: '/assets/icon/logo_cresca.png',
    empresa_nombre: '',
    empresa_color: '',
    type: ''
  };
  Cuestionario: Group[]= [];
  binding: Producto={
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
  formsolicitante: formNufi = {
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
    reporte_id: ''
  };
  formrepresentante: formNufi = {
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
    reporte_id: ''
  };
  formsaval: formNufi = {
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
    reporte_id: ''
  };
  presupuesto_info: any=null;
  terminos_credito: any=null;
  tabla_amortizacion: TablaAmortizacion[] = [];
  capacidad_id:any=null;
  capacidad_info:any=null;
  doc_general:arraydocs[] = [];
  doc_finaciero:arraydocs[] = [];
  
  constructor() { }

  async show(): Promise<void> {
    this.isloader=await true;
  }
  async hide(): Promise<void>{
   this.isloader = await false;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
          });
    });
}
}