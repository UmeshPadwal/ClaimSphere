import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaimService } from '../../services/claim.service';
import { ClaimResponse } from '../../models/claim-response';

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-detail.html',
  styleUrl: './claim-detail.css'
})
export class ClaimDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private claimService = inject(ClaimService);

  claim?: ClaimResponse;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.claimService
      .getClaimById(id)
      .subscribe({

        next: response => {

          this.claim = response;

        },

        error: error => {

          console.error(error);

        }

      });

  }

  goBack(): void {

    this.router.navigate(['/claims']);

  }

  editClaim(): void {

    this.router.navigate(['/claims/edit', this.claim?.id]);

  }

}