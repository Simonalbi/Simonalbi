import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { AgencyTimelineComponent } from './agency-timeline/agency-timeline.component';
import { WorkingExperienceService } from '../../services/working-experience.service';

@Component({
  selector: 'app-working-experience',
  standalone: true,
  imports: [DashboardCardComponent, AgencyTimelineComponent],
  templateUrl: './working-experience.component.html',
  styleUrl: './working-experience.component.css'
})
export class WorkingExperienceComponent {
  constructor(protected workingExperienceService: WorkingExperienceService) {}
}
