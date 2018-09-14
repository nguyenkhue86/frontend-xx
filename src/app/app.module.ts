import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {DialogComponent, ListComponent, DeleteDialogComponent} from './main/data/list/list.component';
import {CaptureComponent} from './main/data/capture/capture.component';
import {
  MatButtonModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatStepperModule,
  MatNativeDateModule, MatCardModule, MatDialogModule
} from '@angular/material';
import {DataService} from './main/data/data.service';
import {CookieService} from "ngx-cookie-service";
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';


const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    redirectTo: '/home/list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'capture',
        component: CaptureComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  entryComponents:[ListComponent,DialogComponent,DeleteDialogComponent],
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CaptureComponent,
    PageNotFoundComponent,
    DialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    LoginModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD-DGpobFgJJgcUTk3z9ltBWr-AlZpyMOU",
      authDomain: "angular-demo-e31f5.firebaseapp.com",
      databaseURL: "https://angular-demo-e31f5.firebaseio.com",
      projectId: "angular-demo-e31f5",
      storageBucket: "angular-demo-e31f5.appspot.com",
      messagingSenderId: "648437194464"
    }),
    AngularFireStorageModule
  ],
  providers: [CookieService, DataService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
