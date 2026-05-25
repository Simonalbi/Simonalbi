export class Hackathon {
  public readonly hackathonName: string;
  public readonly url: string;
  public readonly hackathonLogo: string;
  public readonly start: Date;
  public readonly end: Date;
  public readonly location: string;
  public readonly projectName: string;
  public readonly projectLogo: string;
  public readonly themes: string[];
  public readonly description: string;
  public readonly files: string[];

  constructor(
    hackathonName: string,
    url: string,
    hackathonLogo: string,
    start: Date,
    end: Date,
    location: string,
    projectName: string,
    projectLogo: string,
    themes: string[],
    description: string,
    files: string[] = []
  ) {
    this.hackathonName = hackathonName;
    this.url = url;
    this.hackathonLogo = hackathonLogo;
    this.start = start;
    this.end = end;
    this.location = location;
    this.projectName = projectName;
    this.projectLogo = projectLogo;
    this.themes = themes;
    this.description = description;
    this.files = files;
  }

  getDuration(): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = this.end.getTime() - this.start.getTime();
    return Math.round(diffInMs / msPerDay) + 1;
  }
}
