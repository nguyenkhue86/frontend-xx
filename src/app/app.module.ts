import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {ListComponent} from './main/data/list/list.component';
import {CaptureComponent} from './main/data/capture/capture.component';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatSidenavModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import {DataService} from './main/data/data.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CaptureComponent,
    PageNotFoundComponent
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
    MatSidenavModule
  ],
  providers: [CookieService, DataService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
