import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Respuesta, RestGenerales, RestProductos } from '../interfaces/general.interface';
import { Restproveedor, restProductofinanciero, tipofile } from '../interfaces/productof.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient, private auth: AuthService) { }

   //********** Servicios de Solicitud ***********************//

   cargarsic(solicitud_id: number,sic:string){
    // https://originacion.lerco.agency/web/v1/empresa/post-load-sic
    let data ={
        token: this.auth.usuario.token,
        solicitud_id,
        sic
    };
    return this.http.post<Respuesta>(`${url}post-load-sic`,data);
  }
  cancelarsolicitud(solicitud_id: number){
    // originacion.lerco.agency/web/v1/empresa/post-cancel-solicitud
    return this.http.post<Respuesta>(`${url}post-cancel-solicitud`,{token: this.auth.usuario.token, solicitud_id});
  }
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
  getproveedores(){
    // http://localhost/dev.originacion/web/v1/empresa/get-proveedores
    return this.http.post<Restproveedor>(`${url}get-proveedores`,{token: this.auth.usuario.token});
  }
  guardarsolicitud(form: any){
    // http://localhost/dev.originacion/web/v1/empresa/post-solicitud
    return this.http.post<Respuesta>(`${url}post-solicitud`,form);
  }
  enviaronedoc(solicitud_id: number,file:tipofile){
    // https://originacion.lerco.agency/web/v1/empresa/save-file-solicitud
  
    return this.http.post<Respuesta>(`${url}save-file-solicitud`,{ token : this.auth.usuario.token, solicitud_id,file });
  }
  enviarTabladeamortizacion(file_amortizacion: string, solicitud_id: number){
    // empresa/post-load-tabla-amortiza
   let data= {
      token: this.auth.usuario.token,
      file_amortizacion,
      solicitud_id
    }
    return this.http.post<Respuesta>(`${url}post-load-tabla-amortiza`,data);
}

}
