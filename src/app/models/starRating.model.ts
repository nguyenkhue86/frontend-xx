export class StarRating {
  id: number;
  hover: boolean;
  active: boolean;
  constructor(id,hover,active) {
    this.id =id;
    this.hover = hover;
    this.active = active;
  }
}
