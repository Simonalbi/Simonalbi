import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { BadgesService } from '../../services/badges.service';
import { BadgeComponent } from "./badge/badge.component";

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, BadgeComponent],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent {
  isExpanded = false;

  constructor(protected badgesService: BadgesService) {}

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
