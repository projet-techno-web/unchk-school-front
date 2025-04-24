import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../../services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-courses.component.html',
  styleUrl: './update-courses.component.css'
})
export class UpdateCoursesComponent implements OnInit {
  id: number = 0;

  course = {
    title: '',
    description: '',
    imageUrl: ''
  };

  selectedFile: File | null = null;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.coursesService.getCourseById(this.id).subscribe({
      next: (res) => {
        this.course = res;
      },
      error: () => {
        this.toastr.error("Erreur lors du chargement du cours");
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.course.title);
    formData.append('description', this.course.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursesService.updateCourse(this.id, formData).subscribe({
      next: () => {
        this.toastr.success('Cours mis à jour avec succès');
        this.router.navigate(['/admin/courses']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erreur lors de la mise à jour du cours");
      }
    });
  }
}
