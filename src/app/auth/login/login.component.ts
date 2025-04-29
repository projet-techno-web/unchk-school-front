import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
  readonly credentials = signal({ email: '', password: '' });
  errorMessage = signal('');
  
  // Utilisation d'un signal pour stocker l'état de l'authentification
  readonly isAuthenticated = signal<boolean>(false);  // Initialisation à false par défaut

  constructor(
    private authService: AuthService,  // Le service d'authentification
    private router: Router,
    private toastr: ToastrService,
  ) {}

  async onLogin() {
    try {
      const response = await firstValueFrom(this.authService.login(this.credentials()));

      // Sauvegarde du token dans sessionStorage
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('authRole', response.user.role);
      sessionStorage.setItem('authName', response.user.firstName + ' ' + response.user.lastName);

      // Mise à jour de isAuthenticated pour refléter l'état de l'utilisateur connecté
      this.isAuthenticated.set(true);

      // Affichage du message de succès
      this.toastr.success('Connexion réussie!', 'Succès');
      
      // Redirection après la connexion réussie
      if (response.user.role === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/student/my-courses']);
      }

    } catch (error: any) {
      // Gestion des erreurs
      if (error.error && error.error.message) {
        this.errorMessage.set(error.error.message);
        this.toastr.error(error.error.message, 'Erreur');
      } else {
        this.errorMessage.set('Email ou mot de passe incorrect');
        this.toastr.error('Email ou mot de passe incorrect', 'Erreur');
      }
    }
  }
}
