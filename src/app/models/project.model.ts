export class Project {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly stars: number;
  readonly language: string;
  readonly topics: string[];
  readonly updatedAt: Date;

  constructor(
    name: string,
    description: string,
    url: string,
    stars: number,
    language: string,
    topics: string[],
    updatedAt: Date
  ) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.stars = stars;
    this.language = language;
    this.topics = topics;
    this.updatedAt = updatedAt;
  }
}
