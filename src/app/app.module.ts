import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, LoginDialogComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './ngrx/data.reducer';
import {StorageServiceModule} from 'angular-webstorage-service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenreComponent } from './genre/genre.component';
import { SearchComponent } from './search/search.component';
import {MoviePlayComponent} from './movie-play/movie-play.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'genre/:id', component: GenreComponent},
  { path: 'search/:name', component: SearchComponent},
  { path: 'film/:id', component: FilmComponent},
  { path: 'film/:id/play', component: MoviePlayComponent},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  entryComponents: [LoginDialogComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    FilmComponent,
    PageNotFoundComponent,
    GenreComponent,
    SearchComponent,
    LoginDialogComponent,
    MoviePlayComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    StorageServiceModule,
    HttpClientModule,
    MatTabsModule,
    StoreModule.forRoot({
      tutorial: reducer
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
