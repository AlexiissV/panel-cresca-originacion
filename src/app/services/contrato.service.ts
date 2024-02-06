import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Respuesta, RestSolicitudes, Restcontratofiles } from '../interfaces/general.interface';
const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  //********** Servicios de Contratos ***********************//

  postenviarfactura(solicitud_id: number,detail:any[]){
    // originacion.lerco.agency/web/v1/empresa/post-load-factura-producto
    return this.http.post<Respuesta>(`${url}post-load-factura-producto`,{token: this.auth.usuario.token, solicitud_id,detail});
  }
  getfilecontrato(solicitud_id: number,capacidad_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-file-contrato
    return this.http.post<Restcontratofiles>(`${url}get-file-contrato`,{token: this.auth.usuario.token,solicitud_id,capacidad_id});
  }
  getfilepagare(solicitud_id: number,fecha: string,capacidad_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-file-pagare
    return this.http.post<Restcontratofiles>(`${url}get-file-pagare`,{token: this.auth.usuario.token,solicitud_id, fecha, capacidad_id});
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
}
