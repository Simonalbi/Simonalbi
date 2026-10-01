import { Component, Input } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CommonModule } from '@angular/common';
import { TrackLinkDirective } from '../../../directives/track-link.directive';

@Component({
  selector: 'app-agency-timeline',
  standalone: true,
  imports: [CommonModule, TrackLinkDirective],
  templateUrl: './agency-timeline.component.html',
  styleUrl: './agency-timeline.component.css'
})
export class AgencyTimelineComponent {
  @Input({required: true}) company!: Company;

  /** Tracks which role indexes are expanded (collapsed by default) */
  expandedRoles: Set<number> = new Set();

  toggleRole(index: number): void {
    if (this.expandedRoles.has(index)) {
      this.expandedRoles.delete(index);
    } else {
      this.expandedRoles.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedRoles.has(index);
  }
}
