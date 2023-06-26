import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkboletos();
  }

  private async checkboletos():Promise<boolean>{
    if(this.auth.usuario.token== '' || null || undefined){
      this.router.navigateByUrl('/auth');
      return false;
    }else{
      return true;
    }
  }
  
}
