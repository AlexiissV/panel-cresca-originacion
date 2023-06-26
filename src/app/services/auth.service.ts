import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { RestAuth, RestInfoLogin, Usuario, Respuesta } from '../interfaces/general.interface';
const url= environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:Usuario={
    token: '',
    email: '',
    nombre: '',
    apellidos: '',
    perfil: 0,
    perfil_text: '',
    empresa: ''
  };

  constructor(private http: HttpClient) { }

  login(form: JSON){
    // http://originacion.lerco.agency/web/v1/empresa/login
    return this.http.post<RestAuth>(`${url}empresa/login`,form);
  }
  getInfo(token_empresa: string){
    // http://localhost/dev.originacion/web/v1/auth/init-info-login
    return this.http.post<RestInfoLogin>(`${url}auth/init-info-login`,{token_empresa});
  }
  resetpass(email: string){
    // http://originacion.lerco.agency/web/v1/empresa/request-password-reset
    return this.http.post<Respuesta>(`${url}empresa/request-password-reset`,email);
  }
}
