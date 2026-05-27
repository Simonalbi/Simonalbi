import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { CertificationsService } from '../../services/certifications.service';
import { CertificationComponent } from "./certification/certification.component";

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [DashboardCardComponent, CertificationComponent],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
  constructor(protected certificationsService: CertificationsService) {}
}
