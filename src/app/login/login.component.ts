import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {Router, RouterLinkActive} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Users: User[] = [
    {
      userName: 'nhvi',
      password: '123'
    },
    {
      userName: 'ttnguyen',
      password: '456'
    },
    {
      userName: 'ntcong',
      password: '123'
    }
  ];


  visibility = 'visibility_off';
  password = 'password';

  constructor(private route: Router,
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

    for(let i =0; i< this.Users.length; i++) {
      if ( username === this.Users[i].userName && password === this.Users[i].password ) {
        this.cookieService.set('username',username);
        this.openSnackBar("Success");
        this.route.navigate(['/home']);
        return;
      }
    }
      this.openSnackBar("Fail");


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
