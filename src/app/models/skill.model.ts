export class Skill {
  public name: string;
  public image: string;
  public level: number;
  public category: string;

  constructor(name: string, image: string, level: number, category: string = 'Other') {
    this.name = name;
    this.image = image;
    this.level = level;
    this.category = category;
  }
}
