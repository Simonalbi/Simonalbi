import { Periodizable } from "../interfaces/periodizable.interface";

export class Role extends Periodizable {
  readonly name: string;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly contractType: string;

  constructor(name: string, startDate: Date, contractType: string, endDate?: Date) {
    super();
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.contractType = contractType;
  }
}