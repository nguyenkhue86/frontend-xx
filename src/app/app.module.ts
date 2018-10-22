import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, LoginDialogComponent, SignUpDialogComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatSelectModule, MatSnackBarModule,
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
import { CommentComponent } from './comment/comment.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'genre/:id', component: GenreComponent},
  { path: 'search/:name', component: SearchComponent},
  { path: 'film/:id', component: FilmComponent},
  { path: 'film/:id/play', component: MoviePlayComponent},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  entryComponents: [LoginDialogComponent, SignUpDialogComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    FilmComponent,
    PageNotFoundComponent,
    GenreComponent,
    SearchComponent,
    LoginDialogComponent,
    MoviePlayComponent,
    CommentComponent,
    SignUpDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatSnackBarModule,
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
