import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { AuthService } from './auth.service';
import { Respuesta, RestDetailSolicitud, RestSolicitudes } from '../interfaces/general.interface';

const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  getSolicitudes(){
    // http://localhost/dev.originacion/web/v1/empresa/get-solicitudes
    return this.http.post<RestSolicitudes>(`${url}get-solicitudes`,{token: this.auth.usuario.token});
  }
  getdetallesolicitud(solicitud_id: number){
    // http://localhost/dev.originacion/web/v1/empresa/get-solicitud-detail
    return this.http.post<RestDetailSolicitud>(`${url}get-solicitud-detail`,{token: this.auth.usuario.token, solicitud_id});
  }
  enviarticket(evidencia_file: string,descripcion: string){
    //http://localhost/dev.originacion/web/v1/empresa/post-nuevo-ticket
    let data ={
      token : this.auth.usuario.token,
      evidencia_file,
      descripcion
    };
    return this.http.post<Respuesta>(`${url}post-nuevo-ticket`,data);
  }
  unicosimulador(data: any){
    // http://localhost/dev.originacion/web/v1/empresa/get-simulador
    return this.http.post<Respuesta>(`${url}get-simulador`,data);
  }
}
