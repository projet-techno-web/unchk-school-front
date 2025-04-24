import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  credentials = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService 
  ) {}
  
  onSubmit() {
    this.studentsService.createStudent(this.credentials).subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        this.toastr.success('Étudiant ajouté avec succès');
        this.router.navigate(['/admin/students']);
      },
      error: (error) => {
        console.error('Erreur retournée :', error);
        this.toastr.error("Erreur lors de l'ajout de l'étudiant");
      }
    });
  }
  
  
}
