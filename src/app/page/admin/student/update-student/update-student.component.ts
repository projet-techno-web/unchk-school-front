import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {
  id: number = 0;

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

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.studentsService.getStudentById(this.id).subscribe({
      next: (student) => {
        this.credentials = {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        };
      },
      error: (err) => {
        this.toastr.error("Erreur lors du chargement de l'étudiant");
        console.error(err);
      }
    });
  }

  onSubmit() {
    this.studentsService.updateStudent(this.id, this.credentials).subscribe({
      next: () => {
        this.toastr.success('Étudiant modifié avec succès');
        this.router.navigate(['/admin/students']);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la modification de l'étudiant");
        console.error(error);
      }
    });
  }
}
