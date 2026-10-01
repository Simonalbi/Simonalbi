import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { TrackLinkDirective } from '../../directives/track-link.directive';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, TrackLinkDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(protected projectsService: ProjectsService) {}
}
