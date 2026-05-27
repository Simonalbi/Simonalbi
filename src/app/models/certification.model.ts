export class Certification {
  public readonly name: string;
  public readonly organization: string;
  public readonly logo: string;
  public readonly date: Date;
  public readonly id: string;
  public readonly url: string;

  constructor(name: string, organization: string, logo: string, date: Date, id: string, url: string) {
    this.name = name;
    this.organization = organization;
    this.logo = logo;
    this.date = date;
    this.id = id;
    this.url = url;
  }
}