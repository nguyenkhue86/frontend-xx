import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_LOGIN} from "../model/api_base";
import {User} from "../model/user.model";


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

  users: User[];

  constructor(private cookieService: CookieService,
              private  http: HttpClient) {
    this.users = [];
  }

  getAll() {
    return new Promise((resolve) => {
      this.http.get<User[]>(url_base).toPromise().then(res => {
        this.users = res.map(item => {
          return new User(
            item.userName,
            item.password
          )
        });
        resolve(this.users);
      });
    });
  }

  isLoggedIn() {

      return this.cookieService.get('username').length !== 0;
  }

  async logIn(username: string, password: string) {
    await  this.getAll().then();
    for (let i = 0; i< this.users.length; i++) {
      if (username === this.users[i].userName && btoa(password) === this.users[i].password) {
        return true;
      }
    }
    return false;

  }

}

