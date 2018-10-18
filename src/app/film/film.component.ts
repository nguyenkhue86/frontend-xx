import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {DataService} from '../data.service';
import {MovieModel} from '../models/movie.model';
import {Actor} from '../models/actor.model';
import {Director} from '../models/director.model';
import {Kind} from '../models/kind.model';
import { DomSanitizer } from '@angular/platform-browser';
import {StarRating} from '../models/starRating.model';
import {FormControl} from '@angular/forms';
import {Comment} from '../models/comment.model';
import {starRatingArray} from '../models/starRatingArray';
import * as BackgroundDataActions from '../ngrx/data.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../ngrx/app.state';
import {Season} from '../models/season.model';
import {Episode} from '../models/episode.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  watch_now = 'WATCH NOW';
  id;
  film: MovieModel = new MovieModel();
  actors: Actor[];
  directors: Director[];
  kinds: Kind[];
  @Input()
  comment: Comment[];
  seasons: Season[];
  episodes: Episode[];
  url ;

  starRatingList: starRatingArray = new starRatingArray();
  starList: starRatingArray = new starRatingArray();
  starNumber:number = 1;


  rateView = 0;
  movie_type: boolean = false;


  constructor(private router: ActivatedRoute,
              private route: Router,
              public sanitizer: DomSanitizer,
              private dataService: DataService,
              private store: Store<AppState>
  ) {

    this.id = +this.router.snapshot.paramMap.get('id').split('_', 1);

    this.dataService.getFilmById(this.id).subscribe(item => {
      this.film = item.data;
      // @ts-ignore
      if (this.film.movie_type == 'Movie') {
        this.movie_type = false;
      } else {
        this.movie_type = true;
        this.dataService.getSeasonByFilmId(this.film.id).subscribe(season => {
          this.seasons = season.data;
        });
      }
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer);
      this.ngRxStore(this.film.background);
    });

    this.dataService.getActorByFilmId(this.id).subscribe(item => {
      this.actors = item.data;
    });

    this.dataService.getDirectorByFilmId(this.id).subscribe(item => {
      this.directors = item.data;
    });

    this.dataService.getKindsByFilmId(this.id).subscribe(item => {
      this.kinds = item.data;
    });

    this.getComment();
  }

  getComment() {
    this.dataService.getCommentByFilmId(this.id).subscribe(item => {
      if (item.data.isEmpty || item.data.length === 0) {
        this.starList.mouseActiveStar(1);
        this.rateView = 0;
      } else {
        this.comment = item.data;
        let sum = 0;
        this.comment.forEach(i => {
          sum += +i.rate;
        });
        this.rateView = this.comment.length;
        this.starNumber = sum/ this.comment.length;
        this.starList.mouseActiveStar(this.starNumber.toPrecision(1));
      }
    });
  }



  getFilmByActor(cast: Actor) {
    let name: string;
    name ='A_'+ cast.id + '_' + cast.actor_name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }

  getFilmByDirector(director: Director) {
    let name: string;
    name ='D_'+ director.id + '_' + director.director_name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }
  getFilmByGenre(kind: Kind) {
    let name: string;
    name ='G_'+ kind.id + '_' + kind.kind_name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }

  getFilmByCountry(country_id,country_name) {
    let name: string;
    name ='C_'+ country_id + '_' + country_name.split(' ').join('_');
    this.route.navigate(['/genre/' + name]);
  }

  playMovie(type: Season) {
    if (type === null) {
      this.route.navigate(['/film/' + this.film.id + '_M/play']);
    } else {
      this.route.navigate(['/film/' + type.id +'_S/play']);
    }
  }

  ngOnInit() {
  }

  ngRxStore(url) {
    this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
    this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: url}));
  }
}
