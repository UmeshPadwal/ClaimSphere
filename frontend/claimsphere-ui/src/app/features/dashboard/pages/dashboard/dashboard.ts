import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';
import { ClaimService } from '../../../claims/services/claim.service';
import { ClaimResponse } from '../../../claims/models/claim-response';
import { QuickActionsComponent } from '../../../../shared/components/quick-actions/quick-actions';
import { RecentClaimsComponent } from '../../../../shared/components/recent-claims/recent-claims';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [StatCardComponent,QuickActionsComponent,RecentClaimsComponent]
})
export class DashboardComponent {

  private router = inject(Router);
  private claimService = inject(ClaimService);

  createClaim(): void {
    this.router.navigate(['/claims/create']);
  }

  claims: ClaimResponse[] = [];

  totalClaims = 0;
  openClaims = 0;
  closedClaims = 0;
  pendingClaims = 0;

  ngOnInit(): void {

  this.claimService.getAllClaims().subscribe({

    next: claims => {

      this.claims = claims;

      this.calculateStatistics();

    }

  });

}
  private calculateStatistics(): void {

  this.totalClaims = this.claims.length;

  this.openClaims = this.claims.filter(c => c.status === 'OPEN').length;

  this.closedClaims = this.claims.filter(c => c.status === 'CLOSED').length;

  this.pendingClaims = this.claims.filter(c => c.status === 'PENDING').length;

}

}