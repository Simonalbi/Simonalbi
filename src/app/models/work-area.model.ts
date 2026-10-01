export class WorkArea {
  readonly title: string;
  readonly description: string;
  readonly technologies: string[];

  constructor(title: string, description: string, technologies: string[]) {
    this.title = title;
    this.description = description;
    this.technologies = technologies;
  }
}
