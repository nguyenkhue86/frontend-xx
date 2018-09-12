import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {ListComponent} from './main/data/list/list.component';
import {CaptureComponent} from './main/data/capture/capture.component';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule} from '@angular/material';
import {MenuComponent} from './main/menu/menu.component';
import {DataService} from './main/data/data.service';
import {HttpClientModule} from '@angular/common/http';

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
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    ListComponent,
    CaptureComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    LoginModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [ DataService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
