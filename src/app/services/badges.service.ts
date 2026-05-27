import { Injectable } from '@angular/core';
import { Badge } from '../models/badge.model';

import * as BADGES from '../../../public/json/badges.json';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  public readonly badges: Array<Badge>;

  constructor() {
    this.badges = BADGES.badges.map((badge) => (new Badge(
      badge.name,
      badge.src,
      new Date(badge.issued),
      badge.verified,
      badge.verifiedCertificationEntityUrl,
      badge.url
    ))).sort((a, b) => a.issued.getTime() - b.issued.getTime());
  }
}
