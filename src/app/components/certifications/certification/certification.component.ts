import { Component, Input } from '@angular/core';
import { Certification } from '../../../models/certification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
export class CertificationComponent {
  @Input({ required: true }) certification!: Certification;
}
