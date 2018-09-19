import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {


  constructor(private cookieService: CookieService) {}

  isLoggedIn() {
      if (this.cookieService.get('username').length !== 0) {
        return true;
      }
      return false;
  }
}

