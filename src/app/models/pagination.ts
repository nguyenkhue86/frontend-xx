import {MovieModel} from './movie.model';

export class Paging {
  movies_total: MovieModel[];
  movies_paging: MovieModel[];
  page: number;
  page_total: number;
  itemPerPage: number;
  constructor() {
    this.movies_total = [];
    this.movies_paging = [];
    this.page = 0;
    this.page_total = 1;
    this.itemPerPage = 8;
  }
  setMovies(movies: MovieModel[]) {
    this.movies_total = movies;
    this.page_total = +(movies.length / this.itemPerPage).toFixed();
    if (movies.length % this.itemPerPage < this.itemPerPage / 2 && movies.length % this.itemPerPage > 0) {
      this.page_total ++;
    }
  }
  setPage(page: number) {
    this.page = page;
  }
  setDataPaging() {
    let start: number;
    let end: number;
    start = this.page * this.itemPerPage;
    end = start + this.itemPerPage;
    this.movies_paging = this.movies_total.slice(start, end);
  }
}
