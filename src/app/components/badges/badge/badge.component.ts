import { Component, Input } from '@angular/core';
import { Badge } from '../../../models/badge.model';
import { CommonModule } from '@angular/common';
import { TrackLinkDirective } from '../../../directives/track-link.directive';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, TrackLinkDirective],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  @Input({ required: true }) badge!: Badge;
}
