import { Component, Input } from '@angular/core';
import { Badge } from '../../../models/badge.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  @Input({ required: true }) badge!: Badge;
}
