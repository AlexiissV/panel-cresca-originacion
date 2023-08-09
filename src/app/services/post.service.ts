import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { AuthService } from './auth.service';
import { Respuesta, RestDetailSolicitud, RestGenerales, RestProductos, RestSolicitudes } from '../interfaces/general.interface';
import { Restvisitaverificacion, restProductofinanciero } from '../interfaces/productof.interface';

const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getGenerales(){
    // http://originacion.lerco.agency/web/v1/empresa/get-cuestionario-identificacion
    return this.http.post<RestGenerales>(`${url}get-cuestionario-identificacion`,{token: this.auth.usuario.token});
  }

  getProductoFinaciero(){
    //http://originacion.lerco.agency/web/v1/producto-financiero/get-producto-financiero
   return this.http.post<restProductofinanciero>(`${url}get-producto-financiero`,{token: this.auth.usuario.token});
  }
  getProductos(){
    //http://localhost/dev.originacion/web/v1/empresa/get-productos
   return this.http.post<RestProductos>(`${url}get-productos`,{token: this.auth.usuario.token});
  }
  getSolicitudes(){
    // http://localhost/dev.originacion/web/v1/empresa/get-solicitudes
    return this.http.post<RestSolicitudes>(`${url}get-solicitudes`,{token: this.auth.usuario.token});
  }
  guardarsolicitud(form: any){
    // http://localhost/dev.originacion/web/v1/empresa/post-solicitud
    return this.http.post<Respuesta>(`${url}post-solicitud`,form);
  }
  getdetallesolicitud(solicitud_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-solicitud-detail
    return this.http.post<RestDetailSolicitud>(`${url}get-solicitud-detail`,{token: this.auth.usuario.token, solicitud_id});
  }
  postenviarfactura(solicitud_id: number,factura:string){
    // originacion.lerco.agency/web/v1/empresa/post-load-factura-producto
    
    return this.http.post<Respuesta>(`${url}post-load-factura-producto`,{token: this.auth.usuario.token, solicitud_id,factura});
  }
  getfilecontrato(solicitud_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-file-contrato
    return this.http.post<Respuesta>(`${url}get-file-contrato`,{token: this.auth.usuario.token,solicitud_id});
  }
  getfilepagare(solicitud_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-file-pagare
    return this.http.post<Respuesta>(`${url}get-file-pagare`,{token: this.auth.usuario.token,solicitud_id});
  }
  postloadcontrato(solicitud_id: number,contrato:string){
    // http://localhost/dev.originacion/web/v1/empresa/post-load-contrato
    return this.http.post<Respuesta>(`${url}post-load-contrato`,{token: this.auth.usuario.token, solicitud_id,contrato});
  }
  postloadpagare(solicitud_id: number,pagare:string){
    // http://localhost/dev.originacion/web/v1/empresa/post-load-pagare
    return this.http.post<Respuesta>(`${url}post-load-pagare`,{token: this.auth.usuario.token, solicitud_id,pagare});
  }
  getsolicitudescontrato(){
    // v1/empresa/get-solicitudes-contratacion
    return this.http.post<RestSolicitudes>(`${url}get-solicitudes-contratacion`,{token: this.auth.usuario.token});
  }
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
  cargarsic(solicitud_id: number,sic:string){
    // https://originacion.lerco.agency/web/v1/empresa/post-load-sic
    let data ={
        token: this.auth.usuario.token,
        solicitud_id,
        sic
    };
    return this.http.post<Respuesta>(`${url}post-load-sic`,data);
  }
}
