import { Component, signal, OnInit } from '@angular/core';
import { Course, CoursesService } from '../../../../services/courses.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
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

  onDelete(id: any) {
    this.coursesService.deleteCourse(id).subscribe({
      next: () => this.getAllCourses(),
      error: (err) => console.error('Erreur lors de la suppression:', err)
    });
  }
}
