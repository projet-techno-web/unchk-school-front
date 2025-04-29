import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
