import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';
import { ClaimService } from '../../../claims/services/claim.service';
import { ClaimResponse } from '../../../claims/models/claim-response';
import { QuickActionsComponent } from '../../../../shared/components/quick-actions/quick-actions';
import { RecentClaimsComponent } from '../../../../shared/components/recent-claims/recent-claims';

import { DashboardStats } from '../../models/dashboard-stats';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [StatCardComponent, QuickActionsComponent, RecentClaimsComponent]
})
export class DashboardComponent {

  private router = inject(Router);
  private claimService = inject(ClaimService);
  private dashboardService = inject(DashboardService);

  stats?: DashboardStats;
  claims: ClaimResponse[] = [];

  ngOnInit(): void {

    this.loadDashboardSummary();

    this.loadRecentClaims();

  }

  createClaim(): void {
    this.router.navigate(['/claims/create']);
  }

  private loadDashboardSummary(): void {

    this.dashboardService.getSummary().subscribe({

      next: response => {

        this.stats = response;

      },

      error: error => {

        console.error(error);

      }

    });

  }

  private loadRecentClaims(): void {

    this.claimService.getAllClaims().subscribe({

      next: claims => {

        this.claims = claims.slice(0, 5);

      },

      error: error => {

        console.error(error);

      }

    });

  }

}