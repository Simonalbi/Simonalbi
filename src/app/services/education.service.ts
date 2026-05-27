import { Injectable } from '@angular/core';
import { School } from '../models/school.model';

import * as EDUCATION from '../../../public/json/education.json';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private education: Array<School>;

  constructor() {
    const education = new Array<School>();

    EDUCATION.education.forEach((school) => {
      education.push(
        new School(
          school.school,
          school.logo,
          school.website,
          school.degree,
          new Date(school.startDate),
          school.endDate ? new Date(school.endDate) : undefined,
          school.grade ? school.grade : undefined
        )
      )
    });

    this.education = education;
  }

  get schools(): Array<School> {
    return this.education;
  }
}
