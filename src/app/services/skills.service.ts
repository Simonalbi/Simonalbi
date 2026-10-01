import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

import * as SKILLS from '../../../public/json/skills.json';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: Array<Skill>;

  constructor() {
    this.skills = SKILLS.skills.map((skill) =>
      new Skill(
        skill.name,
        skill.image,
        skill.level,
        skill.category || 'Other'
      )
    );
  }

  get skillsList(): Array<Skill> {
    return this.skills;
  }
}
