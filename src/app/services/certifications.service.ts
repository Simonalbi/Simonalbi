import { Injectable } from '@angular/core';
import { Certification } from '../models/certification.model';

import * as CERTIFICATIONS from '../../../public/json/certifications.json';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
  public readonly certifications: Array<Certification>;

  get realCertifications(): Array<Certification> {
    return this.certifications.filter(c => c.type === 'certification');
  }

  get courses(): Array<Certification> {
    return this.certifications.filter(c => c.type === 'course');
  }

  constructor() {
    this.certifications = CERTIFICATIONS.certifications.map((certification) => (new Certification(
      certification.name,
      certification.organization,
      certification.logo,
      new Date(certification.date),
      certification.id,
      certification.url,
      (certification as any).type ?? 'certification'
    )));
  }
}
