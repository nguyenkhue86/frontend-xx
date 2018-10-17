import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Kind} from './models/kind.model';
import {Comment} from './models/comment.model';

const api = 'http://localhost/api-php/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http: HttpClient) { }

  getKindsOfFilm(): Observable<any> {
    const url = api + '/kind.php';
    return this.http.get<any>(url);
  }

  getKindsByFilmId(id: number): Observable<any> {
    const url = api + '/kind.php?movieid=';
    return this.http.get<any>(url + id);
  }

  getCountries(): Observable<any> {
    const url = api + '/country.php';
    return this.http.get<any>(url);
  }

  getFilmsByCountryId(id: number): Observable<any> {
    const url = api + '/country.php?country=';
    return this.http.get<any>(url + id);
  }

  getFilms(): Observable<any> {
    const url = api + '/new.php';
    return this.http.get<any>(url);
  }

  getFilmById(id: number): Observable<any> {
    const url = api + '/movies.php?id=';
    return this.http.get<any>(url + id);
  }

  getActorByFilmId(id: number): Observable<any> {
    const url = api + '/actor.php?movie=';
    return this.http.get<any>(url + id);
  }

  getDirectorByFilmId(id: number): Observable<any> {
    const url = api + '/director.php?movieid=';
    return this.http.get<any>(url + id);
  }

  postComment(data: Comment){
    const url = api + '/comment.php';
    this.http.post(url,data,httpOptions).subscribe(data => {return data} );
  }

  getCommentByFilmId(id: number): Observable<any> {
    const url = api + '/comment.php?id=';
    return this.http.get<any>(url + id);
  }

  getFilmByKindId(id: number): Observable<any> {
    const url = api + '/kind.php?kind=';
    return this.http.get<any>(url + id);
  }



  getFilmByGenreId(id): Observable<any> {
    const url = api + '/genre.php?'+id[0]+'=';
    return this.http.get<any>(url + id[1]);
  }

  searchFilm(id): Observable<any> {
    const url = api + '/search.php?'+id[0]+'=';
    console.log(url + id[1]);
    return this.http.get<any>(url + id[1]);
  }


  getSeasonByFilmId(id): Observable<any> {
    const url = api + '/season.php?movie_id=';
    return this.http.get<any>(url + id);
  }

  getEpisodeBySeasonId(id): Observable<any> {
    const url = api + '/episode.php?season_id=';
    return this.http.get<any>(url + id);
  }



}
