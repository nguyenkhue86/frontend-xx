import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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
    if (this.innerWidth < 769) {
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
