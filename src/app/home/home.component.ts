import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../models/movie.model';
import {Router} from '@angular/router';
import * as BackgroundDataActions from '../ngrx/data.actions';
import {AppState} from '../ngrx/app.state';
import {Store} from '@ngrx/store';
import {DataService} from '../data.service';
import {Kind} from '../models/kind.model';
import {Paging} from '../models/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pages: number;
  datal :MovieModel[];
  data: MovieModel[] ;
  data2: MovieModel[];
  genres: Kind[] = [];
  paging: Paging = new Paging();
  categoryIndex = 0;
  constructor(private router: Router,
              private dataService: DataService,
              private store: Store<AppState>) {
    this.dataService.getKindsOfFilm().subscribe(data => {
      this.genres = data.data;
    });
    this.getAllFilm();

  }

  ngOnInit() {
  }

  paginatorFunc(data) {
    this.paging = new Paging();
    this.paging.setMovies(data.data);
    this.paging.setDataPaging();
    this.datal = this.paging.movies_paging;
    this.pages = this.paging.page_total;
  }

  watch(data: MovieModel) {
    this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
    this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: data.background}));
    let name: string;
    name = data.movie_name;
    name = data.id + '_' + name.split(' ').join('_');
    this.router.navigate(['film/' + name]);
  }

  getFilmByGenresId(id) {
    this.categoryIndex = id;
    this.dataService.getFilmByKindId(id).subscribe(data => {
      if (data.data) {
        this.paginatorFunc(data);
        this.datal = data.data;
      }
    });
  }

  getAllFilm() {
    this.categoryIndex = 0;
    this.dataService.getFilms().subscribe(data => {
      this.paginatorFunc(data);
      this.data = data.data.slice(0, 4);
      this.data2 = data.data.slice(4, 8);
    });
  }

  setPage(item:number) {
    this.paging.setPage(item);
    this.paging.setDataPaging();
    this.datal = this.paging.movies_paging;
  }

}
