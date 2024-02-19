import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/general.interface';
import { TablaAmortizacion } from '../interfaces/productof.interface';

@Injectable({
  providedIn: 'root'
})
export class SimularService {

  bindings: Producto[] =[];
  equipos:any[]=[];
  inversiontotal: number= 0;
  terminos_credito :any = null;
  capacidad_id:any=null;
  comisionxapertura: number =0;
  gastos_contratacion: number =0;
  tabla_amortizacion: TablaAmortizacion[] = [];

  constructor() { }
}
