import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatSidenav} from "@angular/material";
import {ListComponent} from "./data/list/list.component";
import {DataService} from "./data/data.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  status_nav: Boolean;
  checkMode = 'side';

  @ViewChild('side') side: MatSidenav;

  constructor(private router: Router,
              private dataService: DataService,
              private cookieService: CookieService) {  }
  userName = this.cookieService.get('username');

  toList() {
    this.router.navigate(['home/list']);
  }
  toAdd() {
    this.router.navigate(['home/capture']);
  }
  toLogout() {
    this.cookieService.deleteAll('../');
    this.userName = '';
    this.router.navigate(['login']);
  }


  close()  {
    this.side.close();
  }
  public innerWidth: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 769) {
      this.status_nav = false;
      this.checkMode = 'over';
    } else {
      this.status_nav =true;
      this.checkMode = 'side';
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }



}
