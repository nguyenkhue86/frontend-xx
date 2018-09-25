import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {Router, RouterLinkActive} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CookieService} from "ngx-cookie-service";
import {AuthenticateService} from "./authenticate.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visibility = 'visibility_off';
  password = 'password';

  constructor(private route: Router,
              private authenService: AuthenticateService,
              private cookieService: CookieService,
              public snackBar: MatSnackBar) { }

  showPass(){
    if(this.visibility === 'visibility_off') {
      this.visibility = 'visibility';
      this.password = 'text';
    } else {
      this.visibility = 'visibility_off';
      this.password = 'password';
    }
  }

  userNameFormControl = new FormControl('',[
    Validators.required
  ]);

  passwordFormControl = new FormControl('',[
    Validators.required
  ]);

  login(username: string, password: string) {
    let users: User[] =[];

    this.authenService.getAll().subscribe(res => {
      users = res.map(item => {
        return new User(
          item.userName,
          item.password
        )});
      for (let i = 0; i< users.length; i++) {
        if (username === users[i].userName && btoa(password) === users[i].password) {
          this.cookieService.set('username',username);
          this.openSnackBar('Success');
          this.route.navigate(['/home']);
        }
      }
      if (this.cookieService.get('username') == '') {
        this.openSnackBar('Fail');
      }

    });

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
  }

  ngOnInit() {
  }

}
