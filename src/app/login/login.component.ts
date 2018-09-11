import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visibility= 'visibility_off';
  password = 'password';
  constructor() { }
  showPass(){
    if(this.visibility === 'visibility_off') {
      this.visibility = 'visibility';
      this.password = 'text';
    } else {
      this.visibility = 'visibility_off';
      this.password = 'password';
    }
  }
  ngOnInit() {
  }

}
