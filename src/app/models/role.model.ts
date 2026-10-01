import { Periodizable } from "../interfaces/periodizable.interface";
import { WorkArea } from "./work-area.model";

export class Role extends Periodizable {
  readonly name: string;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly contractType: string;
  readonly areas: WorkArea[];

  constructor(name: string, startDate: Date, contractType: string, endDate?: Date, areas: WorkArea[] = []) {
    super();
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.contractType = contractType;
    this.areas = areas;
  }
}