import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Role } from '../models/role.model';
import { WorkArea } from '../models/work-area.model';

import * as WORKING_EXPERIENCE from '../../../public/json/working-experience.json';

@Injectable({
  providedIn: 'root'
})
export class WorkingExperienceService {
  private workingExperience: Array<Company>;

  constructor() {
    const workingExperience = new Array<Company>();

    WORKING_EXPERIENCE.working_experience.forEach((company) => {
      workingExperience.push(
        new Company(
          company.company,
          company.logo,
          company.location,
          company.work_mode,
          company.website,
          company.roles.map((role) => {
            const areas = (role as any).areas
              ? (role as any).areas.map((a: any) => new WorkArea(a.title, a.description, a.technologies ?? []))
              : [];
            return new Role(
              role.name,
              new Date(role.start_date),
              role.contract_type,
              role.end_date ? new Date(role.end_date) : undefined,
              areas
            );
          })
        )
      );
    });

    this.workingExperience = workingExperience;
  }

  get companies(): Array<Company> {
    return this.workingExperience;
  }
}
