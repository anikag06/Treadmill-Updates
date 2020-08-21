import slugify from 'slugify';

export class Game {
  public name: string;
  public thumbnail: string;
  public slug: string;

  constructor(name: string, thumbnail: string, slug?: string) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.slug = slug || slugify(name, { lower: true });
  }
}
