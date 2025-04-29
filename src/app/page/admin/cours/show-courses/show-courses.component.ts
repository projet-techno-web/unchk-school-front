import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../services/courses.service';

@Component({
  selector: 'app-show-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.css']
})
export class ShowCoursesComponent implements OnInit {

  id: number = 0;

  course = {
    title: '',
    description: '',
    imageUrl: '',
    comments: [] as Array<{
      author: string;
      created_at: string;
      content: string;
    }>
  };

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.coursesService.getCourseById(this.id).subscribe({
      next: (res) => {
        this.course = res;
      },
      error: () => {
        console.error("Erreur lors du chargement du cours");
      }
    });
  }

  comments() {
    return this.course.comments || [];
  }
}
