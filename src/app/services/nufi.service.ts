import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { RestReporteNufi, RestreporteID } from '../interfaces/nufi.interface';
const url= environment.url+'empresa/'

@Injectable({
  providedIn: 'root'
})
export class NufiService {

  constructor(private http:HttpClient) { }

  solicitarReportenufi(form:any) {
    // https://originacion.lerco.agency/web/v1/empresa/get-bgc-entrada
    return this.http.post<RestreporteID>(`${url}get-bgc-entrada`,form);
    
  }
  getinforeporte(id: string){
    // 79f0f03f-2890-468c-b785-bf2a1c84cd2b benjamin
    // :'67276a45-4559-4397-8ce9-4102afd06796' alexis
    // https://originacion.lerco.agency/web/v1/empresa/get-bgc-salida
    return this.http.post<RestReporteNufi>(`${url}get-bgc-salida`,{id});
  }
}
