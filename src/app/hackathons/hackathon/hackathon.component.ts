import { Component, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Hackathon } from '../../services/hackathon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hackathon.component.html',
  styleUrl: './hackathon.component.css'
})
export class HackathonComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) hackathon!: Hackathon;

  activeCardIndex = 0;
  progressPercentage = 0;
  private timeoutId: any = null;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateVideoPlayback();
    this.initCardProgress();
  }

  ngOnDestroy(): void {
    this.resetProgressAndTimers();
  }

  getFileExtension(file: string): string {
    return file.split('.').pop()?.toLowerCase() || '';
  }

  isVideo(file: string): boolean {
    const ext = this.getFileExtension(file);
    return ['webm', 'mp4', 'ogg', 'mov'].includes(ext);
  }

  isImage(file: string): boolean {
    const ext = this.getFileExtension(file);
    return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext);
  }

  getFileName(file: string): string {
    return file.split('/').pop() || file;
  }

  getRelativeIndex(index: number): number {
    const total = this.hackathon.files.length;
    if (total === 0) return 0;
    return (index - this.activeCardIndex + total) % total;
  }

  nextCard(): void {
    const total = this.hackathon.files.length;
    if (total > 1) {
      this.activeCardIndex = (this.activeCardIndex + 1) % total;
      this.updateVideoPlayback();
      this.initCardProgress();
    }
  }

  prevCard(): void {
    const total = this.hackathon.files.length;
    if (total > 1) {
      this.activeCardIndex = (this.activeCardIndex - 1 + total) % total;
      this.updateVideoPlayback();
      this.initCardProgress();
    }
  }

  setActiveCard(index: number): void {
    this.activeCardIndex = index;
    this.updateVideoPlayback();
    this.initCardProgress();
  }

  onCardClick(index: number): void {
    const rel = this.getRelativeIndex(index);
    if (rel === 0) {
      this.nextCard();
    } else {
      this.setActiveCard(index);
    }
  }

  updateVideoPlayback(): void {
    setTimeout(() => {
      const cards = this.elRef.nativeElement.querySelectorAll('.deck-card');
      cards.forEach((card: any) => {
        const video = card.querySelector('video');
        if (video) {
          const isFront = card.classList.contains('card-0');
          if (isFront) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });
    }, 50);
  }

  resetProgressAndTimers(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.progressPercentage = 0;
  }

  startImageProgress(): void {
    this.resetProgressAndTimers();
    this.timeoutId = setTimeout(() => {
      this.nextCard();
    }, 5000);
  }

  initCardProgress(): void {
    this.resetProgressAndTimers();
    const activeFile = this.hackathon.files[this.activeCardIndex];
    if (activeFile && this.isImage(activeFile)) {
      this.startImageProgress();
    }
  }

  onVideoTimeUpdate(event: Event): void {
    const video = event.target as HTMLVideoElement;
    // Only track progress for the active video card to prevent overlapping state updates
    const card = video.closest('.deck-card');
    if (card && card.classList.contains('card-0') && video.duration) {
      this.progressPercentage = (video.currentTime / video.duration) * 100;
    }
  }

  onVideoEnded(): void {
    this.nextCard();
  }
}

