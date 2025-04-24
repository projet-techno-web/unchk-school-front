// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-courses',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-courses.component.html',
//   styleUrl: './add-courses.component.css'
// })
// export class AddCoursesComponent {

// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../../../../services/courses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {
  course = {
    title: '',
    description: ''
  };

  selectedFile: File | null = null;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.course.title);
    formData.append('description', this.course.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursesService.createCourse(formData).subscribe({
      next: () => {
        this.toastr.success('Cours ajouté avec succès');
        this.router.navigate(['/admin/courses']);
      },
      error: (error) => {
        console.error('Erreur lors de la création du cours :', error);
        this.toastr.error("Erreur lors de l'ajout du cours");
      }
    });
  }
}
