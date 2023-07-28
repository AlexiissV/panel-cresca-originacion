import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudGuard implements CanActivate {
  constructor(private local: LocalService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkboletos();
  }

  private async checkboletos():Promise<boolean>{
    if(this.local.solicitud_id==null){
      this.router.navigateByUrl('/promotor');
      return false;
    }else{
      return true;
    }
  }
  
}
