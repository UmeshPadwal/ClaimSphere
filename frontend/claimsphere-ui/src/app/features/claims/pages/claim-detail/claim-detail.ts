import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaimService } from '../../services/claim.service';
import { ClaimResponse } from '../../models/claim-response';

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './claim-detail.html',
  styleUrl: './claim-detail.css'
})
export class ClaimDetailComponent implements OnInit {

  private claimService = inject(ClaimService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  claim: ClaimResponse | null = null;

  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid claim ID.';
      this.isLoading = false;
      return;
    }

    this.loadClaim(id);
  }

  private loadClaim(id: number): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.claimService.getClaimById(id).subscribe({

      next: (response) => {

        this.claim = response;
        this.isLoading = false;

      },

      error: (error) => {

        console.error('Unable to load claim:', error);

        this.errorMessage =
          'Unable to load claim details. Please try again.';

        this.isLoading = false;
      }

    });
  }

  getStatusClass(status: string): string {

    return status
      ?.toLowerCase()
      .replace(/\s+/g, '_') ?? '';
  }

  goBack(): void {
    this.router.navigate(['/claims']);
  }

  editClaim(): void {

    if (this.claim?.id) {
      this.router.navigate(['/claims/edit', this.claim.id]);
    }

  }

  retry(): void {

    if (this.claim?.id) {
      this.loadClaim(this.claim.id);
    } else {
      this.goBack();
    }

  }
}