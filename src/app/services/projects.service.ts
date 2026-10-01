import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

import * as PROJECTS from '../../../public/json/projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public readonly projects: Array<Project>;

  constructor() {
    this.projects = PROJECTS.projects.map((p) => new Project(
      p.name,
      p.description,
      p.url,
      p.stars,
      p.language,
      p.topics,
      new Date(p.updated_at)
    ));
  }
}
