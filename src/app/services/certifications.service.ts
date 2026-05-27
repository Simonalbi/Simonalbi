import { Injectable } from '@angular/core';
import { Certification } from '../models/certification.model';

import * as CERTIFICATIONS from '../../../public/json/certifications.json';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
  public readonly certifications: Array<Certification>;

  constructor() {
    this.certifications = CERTIFICATIONS.certifications.map((certification) => (new Certification(
      certification.name,
      certification.organization,
      certification.logo,
      new Date(certification.date),
      certification.id,
      certification.url
    )));
  }
}
