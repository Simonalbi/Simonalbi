import { Component, Input } from '@angular/core';
import { Hackathon } from '../../services/hackathon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hackathon.component.html',
  styleUrl: './hackathon.component.css'
})
export class HackathonComponent {
  @Input({ required: true }) hackathon!: Hackathon;

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
}
