import {StarRating} from './starRating.model';

export class starRatingArray {
  starRatingList: StarRating[];
  rate: number = 1;
  constructor() {
    this.star();
  }

  mouseOverStar(id) {
    for(let i = 1 ; i<=id ; i++){
      this.starRatingList[i-1].hover=true;
    }
  }
  mouseLeaveStar() {
    const lenght = this.starRatingList.length;
    for(let i = 0 ; i<lenght ; i++){
      this.starRatingList[i].hover=false;
    }
  }
  mouseActiveStar(id) {
    this.star();
    for(let i = 1 ; i<=id ; i++){
      this.starRatingList[i-1].active=true;
    }
    this.rate = id;
  }
  star() {
    this.starRatingList = [];
    for(let i = 1 ; i<=10 ; i++){
      this.starRatingList.push(new StarRating(i,false,false));
    }
  }
}
