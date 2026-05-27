import { Periodizable } from "../interfaces/periodizable.interface";
import { Role } from "./role.model";

export class Company extends Periodizable {
  readonly name: string;
  readonly logo: string;
  readonly location: string;
  readonly workMode: string;
  readonly website: string;
  readonly roles: Array<Role>;
  override startDate: Date;
  override endDate?: Date;

  constructor(name: string, logo: string, location: string, workMode: string, website: string, roles: Array<Role>) {
    super();
    this.name = name;
    this.logo = logo;
    this.location = location;
    this.workMode = workMode;
    this.website = website;

    this.roles = roles;
    this.roles.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

    this.startDate = this.roles[this.roles.length - 1].startDate;
    this.endDate = this.roles[0].endDate;
  }

  get absoluteStartDate(): Date {
    return this.roles[this.roles.length - 1].startDate;
  }

  get absoluteEndDate(): Date | null {
    return this.roles[0].endDate ?? null;
  }
}