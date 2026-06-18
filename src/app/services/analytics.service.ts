import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analytics = inject(Analytics);

  /**
   * Traccia quando una sezione della pagina entra nel viewport.
   * @param sectionId - L'id della sezione (es. 'skills', 'hackathons')
   */
  trackSectionViewed(sectionId: string): void {
    logEvent(this.analytics, 'section_viewed', {
      section_id: sectionId
    });
  }

  /**
   * Traccia quando l'utente clicca su un link di rilievo.
   * @param linkName - Nome descrittivo del link (es. 'github_profile', 'linkedin')
   * @param url - URL di destinazione
   */
  trackLinkClicked(linkName: string, url: string): void {
    logEvent(this.analytics, 'link_clicked', {
      link_name: linkName,
      link_url: url
    });
  }
}
