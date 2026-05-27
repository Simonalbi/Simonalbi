import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { BadgesService } from '../../services/badges.service';
import { BadgeComponent } from "./badge/badge.component";

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [DashboardCardComponent, BadgeComponent],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent {
  constructor(protected badgesService: BadgesService) {}
}
