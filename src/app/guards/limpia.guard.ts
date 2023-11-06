import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SimularService } from '../services/simular.service';

@Injectable({
  providedIn: 'root'
})
export class LimpiaGuard implements CanActivate {
  constructor(private simular: SimularService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkboletos();
  }

  private async checkboletos():Promise<boolean>{
    this.simular.bindings  =[];
  this.simular.equipos =[];
  this.simular.inversiontotal = 0;
  this.simular.terminos_credito = null;
  this.simular.capacidad_id = null;
  this.simular.tabla_amortizacion = [];

   return true;
  }
}
