import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_LOGIN} from "../model/api_base";
import {User} from "../model/user.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const url_base = API_LOGIN;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private cookieService: CookieService,
              private  http: HttpClient) {
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(url_base);

  }

  isLoggedIn() {
      return this.cookieService.get('username').length !== 0;
  }

}

