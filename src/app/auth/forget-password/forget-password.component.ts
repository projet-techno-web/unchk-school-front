import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  readonly credentials = signal({ email: '' });
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  async onForgetPassword() {
    try {
      await firstValueFrom(this.authService.forgetPassword(this.credentials().email));
      this.toastr.success('Un email de réinitialisation a été envoyé', 'Succès');
    } catch (error: any) {
      if (error.error && error.error.message) {
        this.toastr.error(error.error.message, 'Erreur');
      } else {
        this.toastr.error('Une erreur est survenue', 'Erreur');
      }
    }
  }

}
