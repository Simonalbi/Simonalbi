import { Component } from '@angular/core';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { CertificationsService } from '../../services/certifications.service';
import { CertificationComponent } from '../certifications/certification/certification.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [DashboardCardComponent, CertificationComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  constructor(protected certificationsService: CertificationsService) {}
}
