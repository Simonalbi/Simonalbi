import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { EducationService } from '../../services/education.service';
import { SchoolComponent } from "./school/school.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [DashboardCardComponent, SchoolComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  constructor(protected educationService: EducationService) {}
}
