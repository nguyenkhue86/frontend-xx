import {Component,Inject, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './ngrx/app.state';
import {ActivatedRoute, Router} from '@angular/router';
import * as BackgroundDataActions from './ngrx/data.actions';
import {Kind} from './models/kind.model';
import {DataService} from './data.service';
import {Country} from './models/country.model';
import {MovieModel} from './models/movie.model';
import {PlatformLocation} from '../../node_modules/@angular/common';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MovieWebsite';
  selected = 'movies';
  url: String;
  initialUrl = 'http://haintheme.com/demo/wp/buster/wp-content/uploads/2017/12/slider-bg.jpg?id=159';
  kinds: Kind[];
  countries: Country[];
  checkScroll: boolean = true;
  formSearch = new FormControl();

  constructor(private store: Store<AppState>,
              private route: Router,
              public dialog: MatDialog,
              private location: PlatformLocation,
              private dataService: DataService) {
    this.dataService.getKindsOfFilm().subscribe(data => {
      this.kinds = data.data;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.data;
    });

    this.location.onPopState(() => {
      this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
      this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: this.initialUrl}));
      this.formSearch.setValue('');

    });
  }
  ngOnInit() {
    this.store.select('tutorial').subscribe(data => {
        if (data.url) {
          this.url = data.url;
      }
    });

    window.addEventListener('scroll',() => {
      if (window.pageYOffset <= 500) {
        this.checkScroll = false;
      } else {
        this.checkScroll = true;
      }
    },true)
  }

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 0);
  }

  selectGenre(item: Kind) {
    let name: string;
    name = item.kind_name;
    name = 'G_' + item.id + '_' + name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }

  selectCountry(item: Country) {
    let name: string;
    name = item.country_name;
    name = 'C_' + item.id + '_' + name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }
  aboutUs() {
    window.scroll(9999, 9999);
  }

  goHome() {
    this.formSearch.setValue('');
    this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
    this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: this.initialUrl}));
    this.route.navigate(['/']);
  }

  getFilmByType(type) {
    let name: string;
    name = 'T_' + '\'' + type + '\'';
    this.route.navigate(['/genre/'+name]);
  }

  searchFilm(name: string) {
    let search: string;
    switch (this.selected) {
      case 'movies' : {
        search = 'M=\'' + name + '\'';
        break;
      }
      case 'casts'  : {
        search = 'A=\'' + name + '\'';
        break;
      }
      case 'directors'  :{
        search = 'D=\'' + name + '\'';
        break;
      }
      default : {
        return;
      }
    }
    this.route.navigate(['/search/' + search]);

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

  }


}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
