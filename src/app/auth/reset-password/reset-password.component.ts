import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  readonly credentials = signal({ newPassword: '', confirmPassword: '' });
  errorMessage = signal('');
  token = signal('');



  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.token.set(params['token']);
    });
  }

  async onResetPassword() {
    try {
      await firstValueFrom(this.authService.resetPassword({
        newPassword: this.credentials().newPassword,
        confirmPassword: this.credentials().confirmPassword
      }, this.token()));
      this.toastr.success('Mot de passe réinitialisé', 'Succès');
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
