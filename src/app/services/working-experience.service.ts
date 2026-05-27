import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Role } from '../models/role.model';

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
          company.roles.map((role) => new Role(
            role.name,
            new Date(role.start_date),
            role.contract_type,
            role.end_date ? new Date(role.end_date) : undefined
          ))
        )
      )
    });

    this.workingExperience = workingExperience;
  }

  get companies(): Array<Company> {
    return this.workingExperience;
  }
}
