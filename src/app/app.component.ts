import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  title = 'Simonalbi';

  @ViewChildren('step0,step1,step2,step3,step4,step5,step6') steps!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const classes = ['slide-in-down', 'fade-in', 'fade-in', 'fade-in', 'fade-in', 'fade-in', 'fade-in'];

    const elements = this.steps.toArray();
    let index = 0;

    const animateNext = () => {
      if (index >= elements.length) return;

      const el = elements[index].nativeElement;
      const cls = classes[index];

      el.classList.add(cls);

      el.addEventListener('animationend', () => {
        index++;
        animateNext();
      }, { once: true });
    };

    animateNext();
  }
}
