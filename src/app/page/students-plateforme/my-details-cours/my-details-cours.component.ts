import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-my-details-cours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-details-cours.component.html',
  styleUrls: ['./my-details-cours.component.css']
})
export class MyDetailsCoursComponent implements OnInit {
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

  authorName = sessionStorage.getItem('authName') || 'Anonyme';

  credentials = {
    content: '',
    author: this.authorName
  };

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.loadCourse();
  }

  loadCourse(): void {
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

  onSubmit() {
    if (!this.credentials.content.trim()) {
      this.toastr.warning("Le commentaire ne peut pas être vide");
      return;
    }

    this.coursesService.createComment(this.id, this.credentials).subscribe({
      next: (response) => {
        this.toastr.success('Commentaire ajouté avec succès');
        this.credentials.content = ''; // Reset textarea
        this.loadCourse(); // Refresh course to show new comment
      },
      error: (error) => {
        console.error('Erreur retournée :', error);
        this.toastr.error("Erreur lors de l'ajout du commentaire");
      }
    });
  }
}
