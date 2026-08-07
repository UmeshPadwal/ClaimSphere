import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.css'
})
export class QuickActionsComponent {

  constructor(private router: Router) {}

  goToCreateClaim() {
    this.router.navigate(['/claims/create']);
  }

  goToClaims() {
    this.router.navigate(['/claims']);
  }

}