import { Injectable } from '@angular/core';
import { Hackathon } from './hackathon.model';

import * as HACKATHONS from '../../../public/json/hackathons.json';

@Injectable({
  providedIn: 'root'
})
export class HackathonsService {
  private _hackathons: Array<Hackathon>;

  constructor() {
    this._hackathons = HACKATHONS.hackathons.map((hackathon) => new Hackathon(
      hackathon.hackathonName,
      hackathon.url,
      hackathon.hackathonLogo,
      new Date(hackathon.start),
      new Date(hackathon.end),
      hackathon.location,
      hackathon.projectName,
      hackathon.projectLogo,
      hackathon.themes,
      hackathon.description,
      hackathon.files || []
    )).sort((a, b) => b.start.getTime() - a.start.getTime());
  }

  get hackathons(): Array<Hackathon> {
    return this._hackathons;
  }
}
