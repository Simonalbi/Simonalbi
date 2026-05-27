import { Component, Input } from '@angular/core';
import { School } from '../../../models/school.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent {
  @Input({required: true}) school!: School;
}
