import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../models/movie.model';
import {Kind} from '../models/kind.model';
import {Paging} from '../models/pagination';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {Store} from '@ngrx/store';
import {AppState} from '../ngrx/app.state';
import * as BackgroundDataActions from '../ngrx/data.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css','../home/home.component.css']
})
export class SearchComponent implements OnInit {
  id;
  pages: number;
  datal :MovieModel[];
  genres: Kind[] = [];
  paging: Paging = new Paging();
  initialUrl = 'http://haintheme.com/demo/wp/buster/wp-content/uploads/2017/12/slider-bg.jpg?id=159';
  constructor(
    private router: Router,
    private routerActived: ActivatedRoute,
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.ngRxStore(this.initialUrl);
    this.routerActived.params.subscribe(data => {
      this.id = data.name;
      this.id = this.id.split('=',2);
      this.dataService.searchFilm(this.id).subscribe(data=> this.paginatorFunc(data));
    });

  }

  ngOnInit() {
  }

  ngRxStore(url) {
    this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
    this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: url}));
  }

  paginatorFunc(data) {
    this.paging = new Paging();
    this.paging.setMovies(data.data);
    this.paging.setDataPaging();
    this.datal = this.paging.movies_paging;
    console.log(this.datal);
    this.pages = this.paging.page_total;
  }
  watch(data: MovieModel) {
    this.ngRxStore(data.background);
    let name: string;
    name = data.movie_name;
    name = data.id + '_' + name.split(' ').join('_');
    this.router.navigate(['film/' + name]);
  }

  getAllFilm(item) {

  }
  setPage(item: number) {
    this.paging.setPage(item);
    this.paging.setDataPaging();
    this.datal = this.paging.movies_paging;
  }

}
