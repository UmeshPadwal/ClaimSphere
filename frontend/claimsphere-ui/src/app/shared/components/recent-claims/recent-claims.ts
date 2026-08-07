import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimResponse } from '../../../features/claims/models/claim-response';

@Component({
  selector: 'app-recent-claims',
  standalone: true,
  templateUrl: './recent-claims.html',
  styleUrl: './recent-claims.css'
})
export class RecentClaimsComponent {

  @Input() claims: ClaimResponse[] = [];

  constructor(private router: Router) {}

  viewClaim(id: number): void {

    this.router.navigate(['/claims/view', id]);

  }

}