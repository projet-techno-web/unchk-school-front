import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  // Ton service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    // Vérifier si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      return true; // L'utilisateur est authentifié et a le bon rôle
    } else {
      // Si l'utilisateur n'est pas authentifié
      console.log('Redirection: Utilisateur non authentifié');
      this.router.navigate([`/`]);
      return false;
    }
  }
}
