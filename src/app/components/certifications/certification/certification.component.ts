import { Component, Input } from '@angular/core';
import { Certification } from '../../../models/certification.model';
import { CommonModule } from '@angular/common';
import { TrackLinkDirective } from '../../../directives/track-link.directive';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule, TrackLinkDirective],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
export class CertificationComponent {
  @Input({ required: true }) certification!: Certification;
}
