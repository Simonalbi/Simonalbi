import { Directive, HostListener, Input, inject } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Direttiva da aggiungere a qualsiasi tag <a> per tracciare automaticamente il click in Firebase Analytics.
 * 
 * Uso con link statici:
 *   <a href="https://github.com" trackLink="github_profile" target="_blank">...</a>
 * 
 * Uso con link dinamici:
 *   <a [href]="company.website" [trackLink]="company.name" target="_blank">...</a>
 */
@Directive({
  selector: 'a[trackLink]',
  standalone: true,
})
export class TrackLinkDirective {
  @Input({ required: true }) trackLink!: string;

  private analyticsService = inject(AnalyticsService);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const url = (event.currentTarget as HTMLAnchorElement).href;
    this.analyticsService.trackLinkClicked(this.trackLink, url);
  }
}
