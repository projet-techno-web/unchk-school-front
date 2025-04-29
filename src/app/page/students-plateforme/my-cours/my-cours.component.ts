import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Course, CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-my-cours',
  standalone: true,
  imports: [NgFor],
  templateUrl: './my-cours.component.html',
  styleUrl: './my-cours.component.css'
})
export class MyCoursComponent {
  readonly courses = signal<Course[]>([]);

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => this.courses.set(data),
      error: (err) => console.error('Erreur lors du chargement des cours:', err)
    });
  }
}
