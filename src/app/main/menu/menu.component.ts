import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private cookieService: CookieService) {  }
   userName = this.cookieService.get('username');

  toList() {
    this.router.navigate(['home/list']);
  }
  toAdd() {
    this.router.navigate(['home/capture']);
  }
  toLogin() {
    this.cookieService.delete('username');
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
