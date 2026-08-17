import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }
}
