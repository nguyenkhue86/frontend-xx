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
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from './models/user.model';


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
  name: string = 'Guest';
  user: User = new User();

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
    },true);
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
    dialogRef.afterClosed().subscribe(data => {
      if (data !== null) {
        this.user = data;
        this.name = this.user.username;
      }
    });

  }

}
@Component({
  selector: 'login-dialog',
  templateUrl: 'dialog/login.component.html',
  styleUrls: ['dialog/login.component.css']
})
export class LoginDialogComponent implements OnInit{

  name:string;
  usernameFormControl = new FormControl();
  passwordFormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public dialog: MatDialog,
    private dataService: DataService,
    public snackBar: MatSnackBar
    ) {}

  signUp(): void {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: '400px',
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  login() {
    if (this.usernameFormControl.value === null || this.passwordFormControl.value === null) {
      this.openSnackBar('Username or Password is incorrect');
    } else {
      this.dataService.getUser(this.usernameFormControl.value,this.passwordFormControl.value).subscribe( data => {
        if (data.data !== false) {
          this.openSnackBar('Success');
          this.dialogRef.close(data.data);
        } else {
          this.openSnackBar('Username or Password is incorrect');
        }
      });
    }

  }

  ngOnInit(): void {

    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '458571621332651',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v3.1'
    //   });
    //   FB.AppEvents.logPageView();
    // };
    //
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }

  loginFb() {

    //TODO
    // console.log("submit login to facebook");
    // // FB.login();
    // FB.login((response)=>
    // {
    //   console.log('submitLogin',response);
    //   if (response.authResponse)
    //   {
    //     var access_token = FB.getAuthResponse()['accessToken'];
    //     console.log(access_token);
    //     //login success
    //     //login success code here
    //     //redirect to home page
    //    setTimeout(() => {
    //      FB.api('/me',function (response) {
    //        this.name = response.name;
    //        console.log(this.name);
    //      });
    //    },100);
    //
    //     this.dialogRef.close(this.name);
    //
    //   }
    //   else
    //   {
    //     console.log('User login failed');
    //   }
    // });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
  }

}

@Component({
  selector: 'signup-dialog',
  templateUrl: 'dialog/signup.component.html',
  styleUrls: ['dialog/signup.component.css']
})
export class SignUpDialogComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(
    public dialogRef: MatDialogRef<SignUpDialogComponent>
  ) {

  }

  check: boolean = false;
  checkPass: boolean = false;

  checkBox() {
    this.check = !this.check;

  }

  signUp() {
    if (this.passwordFormControl.value !== this.confirmPasswordFormControl.value) {
      this.checkPass = true;
      console.log(this.checkPass);
    } else {
      this.checkPass = false;
      console.log(this.checkPass);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
