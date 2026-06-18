import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren, NgZone, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSummaryComponent } from "./components/profile-summary/profile-summary.component";
import { WorkingExperienceComponent } from "./components/working-experience/working-experience.component";
import { EducationComponent } from './components/education/education.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { BadgesComponent } from "./components/badges/badges.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { HackathonsComponent } from "./components/hackathons/hackathons.component";
import { CodeLoaderComponent } from './components/code-loader/code-loader.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileSummaryComponent, WorkingExperienceComponent, EducationComponent, CertificationsComponent, BadgesComponent, SkillsComponent, HackathonsComponent, CodeLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Simonalbi';

  private unlistenMouseMove?: () => void;
  private analyticsService = inject(AnalyticsService);

  constructor(private ngZone: NgZone) {}

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    // Run outside Angular so mouse moves don't trigger change detection loops
    this.ngZone.runOutsideAngular(() => {
      let ticking = false;
      const mouseHandler = (event: MouseEvent) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
            document.documentElement.style.setProperty('--mouse-page-x', `${event.pageX}px`);
            document.documentElement.style.setProperty('--mouse-page-y', `${event.pageY}px`);
            ticking = false;
          });
          ticking = true;
        }
      };
      document.addEventListener('mousemove', mouseHandler, { passive: true });
      this.unlistenMouseMove = () => document.removeEventListener('mousemove', mouseHandler);
    });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
            // Traccia la sezione vista in Firebase Analytics
            const sectionId = (entry.target as HTMLElement).id;
            if (sectionId) {
              this.analyticsService.trackSectionViewed(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.sections.forEach((section) => {
      this.observer.observe(section.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
    }
  }
}
