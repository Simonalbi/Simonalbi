import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analytics = inject(Analytics);

  /**
   * Tracks when a section of the page enters the viewport.
   * @param sectionId - The section id (e.g. 'skills', 'hackathons')
   */
  trackSectionViewed(sectionId: string): void {
    logEvent(this.analytics, 'section_viewed', {
      section_id: sectionId
    });
  }

  /**
   * Tracks when the user clicks on a relevant link.
   * @param linkName - Descriptive name of the link (e.g. 'github_profile', 'linkedin')
   * @param url - Destination URL
   */
  trackLinkClicked(linkName: string, url: string): void {
    logEvent(this.analytics, 'link_clicked', {
      link_name: linkName,
      link_url: url
    });
  }
}
