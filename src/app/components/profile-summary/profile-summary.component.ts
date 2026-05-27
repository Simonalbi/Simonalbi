import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

@Component({
  selector: 'app-profile-summary',
  standalone: true,
  imports: [DashboardCardComponent],
  providers: [DatePipe],
  templateUrl: './profile-summary.component.html',
  styleUrl: './profile-summary.component.css'
})
export class ProfileSummaryComponent {
  private bornDate: Date = new Date(2003, 11, 6);

  constructor(private datePipe: DatePipe) {}

  get birthday(): string {
    return this.datePipe.transform(this.bornDate, 'd MMM y')!;
  }

  get age(): number {
    const now = new Date();
    const ageInMilliseconds = now.getTime() - this.bornDate.getTime();
    const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
    const ageInYears = ageInDays / 365.25;
    return Math.floor(ageInYears);
  }
}
