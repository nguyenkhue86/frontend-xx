export class MovieModel {
  id: number;
  movie_name: string;
  trailer: string;
  movie_content: string;
  avatar_movie_url: string;
  background: string;
  date_of_manufacture: string;
  year_of_manufacture: number;
  duration: number;
  quality: string;
  resolution: string;
  language: string;
  state: string;
  view: number;
  country_id: number;
  company_id: number;
  movie_type: number;
  country_name: string;
  company_name: string;
  constructor () {
     this.id = 0;
     this.movie_name  = '';
     this.trailer  = '';
     this.movie_content  = '';
     this.avatar_movie_url = '';
     this.background = '';
     this.date_of_manufacture = '';
     this.year_of_manufacture = 0;
     this.duration = 0;
     this.quality = '';
     this.resolution = '';
     this.language = '';
     this.state = '';
     this.view = 0;
     this.country_id = 0;
     this.company_id = 0;
     this.movie_type = 0;
     this.country_name = '';
     this.company_name = '';
  }
}
