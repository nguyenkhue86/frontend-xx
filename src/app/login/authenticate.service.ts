import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {


  constructor(private cookieService: CookieService) {}

  isLoggedIn() {
      return this.cookieService.get('username').length !== 0;
  }
}

