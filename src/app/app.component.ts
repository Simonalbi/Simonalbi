import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSummaryComponent } from "./components/profile-summary/profile-summary.component";
import { WorkingExperienceComponent } from "./components/working-experience/working-experience.component";
import { EducationComponent } from './components/education/education.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { BadgesComponent } from "./components/badges/badges.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { HackathonsComponent } from "./components/hackathons/hackathons.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileSummaryComponent, WorkingExperienceComponent, EducationComponent, CertificationsComponent, BadgesComponent, SkillsComponent, HackathonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Simonalbi';

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.sections.forEach((section) => {
      this.observer.observe(section.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
