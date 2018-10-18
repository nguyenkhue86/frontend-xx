import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieModel} from '../models/movie.model';
import {Actor} from '../models/actor.model';
import {Kind} from '../models/kind.model';
import {FullMovie} from '../models/fullmovie.model';
import {DomSanitizer} from '@angular/platform-browser';
import * as BackgroundDataActions from '../ngrx/data.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../ngrx/app.state';

@Component({
  selector: 'app-movie-play',
  templateUrl: './movie-play.component.html',
  styleUrls: ['./movie-play.component.css']
})
export class MoviePlayComponent implements OnInit {
  id;
  film: FullMovie = new FullMovie();
  relatedMovie: MovieModel[] = [];
  url;

  constructor(private route: Router,
              private dataService: DataService,
              private store: Store<AppState>,
              public sanitizer: DomSanitizer,
              private router: ActivatedRoute) {
    this.id = +this.router.snapshot.paramMap.get('id');
    this.dataService.getFilmById(this.id).subscribe(item => {
      this.film = item.data;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer);
      this.dataService.getRelatedMovie(this.film).subscribe(data => {
        this.relatedMovie = data.data;
      })
    });
  }

  goToDetail(data: MovieModel) {
    this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
    this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: data.background}));
    let name: string;
    name = data.movie_name;
    name = data.id + '_' + name.split(' ').join('_');
    this.route.navigate(['film/' + name]);
  }


  ngOnInit() {
  }

}
