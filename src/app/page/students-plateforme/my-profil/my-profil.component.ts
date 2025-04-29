import { Component } from '@angular/core';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-my-profil',
  standalone: true,
  imports: [],
  templateUrl: './my-profil.component.html',
  styleUrl: './my-profil.component.css'
})
export class MyProfilComponent {
  profil = {
    firstName: '',
    lastName: '',
    email: '',
  };

  authorName = sessionStorage.getItem('authName') || 'Anonyme';

  credentials = {
    content: '',
    author: this.authorName
  };

  constructor(
    private studentsService: StudentsService,
      ) {}

  ngOnInit(): void {
    this.loadProfil();
  }

  loadProfil(): void {
    this.studentsService.getMyProfil().subscribe({
      next: (res) => {
        this.profil = res;
      },
      error: () => {
        console.error("Erreur lors du chargement du cours");
      }
    });
  }


}
