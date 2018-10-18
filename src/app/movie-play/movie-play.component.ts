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
import {Episode} from '../models/episode.model';
import {Season} from '../models/season.model';

@Component({
  selector: 'app-movie-play',
  templateUrl: './movie-play.component.html',
  styleUrls: ['./movie-play.component.css']
})
export class MoviePlayComponent implements OnInit {
  id;
  film: FullMovie = new FullMovie();
  relatedMovie: any[] = [];
  url;
  episodes: Episode[] = [];
  season: Season = new Season();
  check: boolean = false;
  epIndex: number;
  constructor(private route: Router,
              private dataService: DataService,
              private store: Store<AppState>,
              public sanitizer: DomSanitizer,
              private router: ActivatedRoute) {

    this.router.params.subscribe(param => {
      this.id = param.id;
      this.id = this.id.split('_',2);

      if (this.id[1] === 'M') {
        this.check = true;
        this.dataService.getFilmById(this.id[0]).subscribe(item => {
          this.film = item.data;
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer);

          this.dataService.getRelatedMovie(this.film).subscribe(data => {
            this.relatedMovie = data.data;
          });

        });
      }
      else {
        this.check = false;
        this.dataService.getSeasonById(this.id[0]).subscribe(item => {
          this.season = item.data;

          this.dataService.getEpisodeBySeasonId(this.season.id).subscribe(data => {

            this.episodes = data.data;
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.episodes[0].url);
            this.epIndex = this.episodes[0].id;

            this.dataService.getRelateSeason(this.season).subscribe(data => {
              this.relatedMovie = data.data;
            });
          });
        });


      }

    });

  }
  watchEp(ep: Episode) {
    this.epIndex = ep.id;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(ep.url);
  }

  goToDetail(data: any) {
    if (this.check === true) {
      this.store.dispatch(new BackgroundDataActions.RemoveBackgroundData());
      this.store.dispatch(new BackgroundDataActions.AddBackgroundData({url: data.background}));
      let name: string;
      name = data.movie_name;
      name = data.id + '_' + name.split(' ').join('_');
      this.route.navigate(['film/' + name]);
    } else {
      this.route.navigate(['/film/' + data.id +'_S/play']);
    }
  }


  ngOnInit() {
  }

}
