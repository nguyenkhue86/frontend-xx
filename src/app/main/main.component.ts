import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {e} from "@angular/core/src/render3";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  status_nav: Boolean;

  constructor(private router: Router,
              private cookieService: CookieService) {  }
  userName = this.cookieService.get('username');

  toList() {
    this.router.navigate(['home/list']);
  }
  toAdd() {
    this.router.navigate(['home/capture']);
  }
  toLogout() {
    this.cookieService.deleteAll();
    this.userName = '';
    this.router.navigate(['login']);
  }
  public innerWidth: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720) {
      this.status_nav = false;
    } else {
      this.status_nav =true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
