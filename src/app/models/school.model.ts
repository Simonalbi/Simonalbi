export class School {
  public name: string
  public logo: string
  public website: string
  public degree: string
  public startDate: Date
  public endDate?: Date
  public grade?: string

  constructor(name: string, logo: string, website: string, degree: string, startDate: Date, endDate?: Date, grade?: string) {
    this.name = name;
    this.logo = logo;
    this.website = website;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.grade = grade;
  }
}
