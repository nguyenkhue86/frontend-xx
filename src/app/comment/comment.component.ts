import { Component, OnInit } from '@angular/core';
import {Comment} from '../models/comment.model';
import {starRatingArray} from '../models/starRatingArray';
import {FormControl} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {MovieModel} from '../models/movie.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment: Comment[];
  starRatingList: starRatingArray = new starRatingArray();
  starList: starRatingArray = new starRatingArray();
  starNumber: number = 1;
  film: MovieModel = new MovieModel();
  id;

  formComment = new FormControl();
  formName = new FormControl();
  formEmail = new FormControl();
  rateView = 0;
  constructor(private dataService: DataService,
              private route: ActivatedRoute) {

    this.route.params.subscribe(param => {
      this.id = param.id;
      this.id = this.id.split('_',2);
      this.dataService.getFilmById(this.id[0]).subscribe(item => {
        this.film = item.data;

      });
    });

    this.starRatingList.mouseActiveStar(1);
    this.getComment();
  }

  getComment() {
    this.dataService.getCommentByFilmId(this.id[0]).subscribe(item => {
      if (item.data.isEmpty || item.data.length === 0) {
      } else {
        this.comment = item.data;
      }
    });
  }


  send() {
    if (this.formName.valid && this.formEmail.valid && this.formComment.valid) {
      let data = new Comment(1, this.film.id, this.starRatingList.rate, this.formComment.value, this.formEmail.value, '');
      try {
        this.dataService.postComment(data);
        this.reset();
        setTimeout(() => {
          this.getComment();
        }, 200);
      } catch (e) {
        console.log(e);
      }
    }
  }

  reset() {
    this.formName.setValue(null);
    this.formComment.setValue(null);
    this.formEmail.setValue(null);
    this.starRatingList.mouseActiveStar(1);
  }

  ngOnInit() {
  }

}
