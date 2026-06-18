import { Directive, HostListener, Input, inject } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Directive to add to any <a> tag to automatically track clicks in Firebase Analytics.
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
