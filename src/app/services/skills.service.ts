import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

import * as SKILLS from '../../../public/json/skills.json';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: Array<Skill>;

  constructor() {
    const skills = new Array<Skill>();

    SKILLS.skills.forEach((skill) => {
      skills.push(
        new Skill(
          skill.name,
          skill.image,
          skill.level
        )
      )
    });

    this.skills = skills;
  }

  get skillsList(): Array<Skill> {
    return this.skills;
  }
}
