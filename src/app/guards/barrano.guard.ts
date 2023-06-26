import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})
export class BarranoGuard implements CanActivate {
  constructor(private local: LocalService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkboletos();
  }

  private async checkboletos():Promise<boolean>{
    if(this.local.barra){
      this.local.barra=false;
    }
   return true;
  }
}
