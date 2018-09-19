import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticateService} from "./authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuardService implements CanActivate{

  constructor(private authenService: AuthenticateService,private  router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  boolean {
    if (this.authenService.isLoggedIn()) {
      console.log(this.authenService.isLoggedIn());
      return true;
    }
    else {
      window.alert("You don't have permission to view this page");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
