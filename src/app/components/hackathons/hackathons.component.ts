import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { HackathonsService } from '../../services/hackathons.service';
import { HackathonComponent } from "./hackathon/hackathon.component";

@Component({
  selector: 'app-hackathons',
  standalone: true,
  imports: [DashboardCardComponent, HackathonComponent],
  templateUrl: './hackathons.component.html',
  styleUrl: './hackathons.component.css'
})
export class HackathonsComponent {
  constructor(protected hackathonsService: HackathonsService) {}
}
