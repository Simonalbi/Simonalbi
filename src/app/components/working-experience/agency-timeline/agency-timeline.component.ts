import { Component, Input } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CommonModule } from '@angular/common';
import { TrackLinkDirective } from '../../../directives/track-link.directive';

@Component({
  selector: 'app-agency-timeline',
  standalone: true,
  imports: [CommonModule, TrackLinkDirective],
  providers: [],
  templateUrl: './agency-timeline.component.html',
  styleUrl: './agency-timeline.component.css'
})
export class AgencyTimelineComponent {
  @Input({required: true}) company!: Company;
}
