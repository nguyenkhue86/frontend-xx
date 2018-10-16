export class Comment {
  id: number;
  movie_id: number;
  rate: number;
 comment: string;
 email: string;
 comment_date: string;
 constructor (id, movie_id, rate, comment, email, comment_data) {
   this.id = id;
   this.movie_id = movie_id;
   this.rate = rate;
   this.comment = comment
   this.email = email
   this.comment_date = comment_data;
 }
}
