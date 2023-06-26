import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
const url= environment.nufi_url

@Injectable({
  providedIn: 'root'
})
export class NufiService {
  headers= new HttpHeaders({
    'Content-Type':  'application/json',
    'Ocp-Apim-Subscription-Key': '9a6e308b05cb48bba283728373d52c05'
  });

  constructor(private post:HttpClient) { }

  validacurp(tipo_busqueda: string,curp: string){
    return this.post.post(`${url}curp/v1/consulta`,{tipo_busqueda,curp},{headers:this.headers})
  }
}
