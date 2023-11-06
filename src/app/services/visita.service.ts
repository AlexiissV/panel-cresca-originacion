import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';
import { Restvisitaverificacion } from '../interfaces/productof.interface';
import { Respuesta } from '../interfaces/general.interface';
const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor( private http: HttpClient, private auth: AuthService) { }

  //********** Servicios de Visitas ***********************//

  getvisitasverificacion(){
    // http://localhost/dev.originacion/web/v1/empresa/get-visitas-verificacion-producto
    return this.http.post<Restvisitaverificacion>(`${url}get-visitas-verificacion-producto`,{token: this.auth.usuario.token});
  }
  getvisitasentregaequipo(){
    // http://localhost/dev.originacion/web/v1/empresa/get-visitas-verificacion-entrega
    return this.http.post<Restvisitaverificacion>(`${url}get-visitas-verificacion-entrega`,{token: this.auth.usuario.token});
  }
  enviarvisitaverificada(lat: string, lng: string, result: number,visita_id: number, evidencia: string[]){
    // http://localhost/dev.originacion/web/v1/empresa/post-seguimiento-visita-verificacion-producto
    let data={
      token: this.auth.usuario.token,
      lat,
      lng,
      result,
      visita_id,
      evidencia
    };
   return this.http.post<Respuesta>(`${url}post-seguimiento-visita-verificacion-producto`,data);
  }
  enviarvisitaentregada(lat: string, lng: string, result: number,visita_id: number, evidencia: string[]){
    // http://localhost/dev.originacion/web/v1/empresa/post-seguimiento-visita-verificacion-entrega
    let data={
      token: this.auth.usuario.token,
      lat,
      lng,
      result,
      visita_id,
      evidencia
    };
    return this.http.post<Respuesta>(`${url}post-seguimiento-visita-verificacion-entrega`,data);
  }
}
