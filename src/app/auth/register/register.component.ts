import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  readonly credentials = signal({ firstName: '', lastName: '', email: '', password: '' , role: 'ADMIN'});

  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async onRegister() {
    try {
      await firstValueFrom(this.authService.register(this.credentials()));
      this.toastr.success('Inscription réussie', 'Succès');
      this.router.navigate(['/login']);
    } catch (error: any) {
      if (error.error && error.error.message) {
        this.errorMessage.set(error.error.message);
        this.toastr.error(error.error.message, 'Erreur');
      } else {
        this.errorMessage.set('Une erreur est survenue');
        this.toastr.error('Une erreur est survenue', 'Erreur');
      }
    }
  }
}
