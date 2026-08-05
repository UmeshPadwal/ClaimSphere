import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimService } from '../../services/claim.service';
import { ClaimResponse } from '../../models/claim-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  templateUrl: './claim-list.html',
  styleUrl: './claim-list.css',
   imports: [CommonModule]
})
export class ClaimListComponent implements OnInit {

  private claimService = inject(ClaimService);
  private router = inject(Router);

  claims: ClaimResponse[] = [];

  ngOnInit(): void {
     console.log('ClaimListComponent initialized');
    this.loadClaims();

  }
 private loadClaims(): void {

  this.claimService.getAllClaims().subscribe({

    next: (response) => {

      this.claims = response;

    },

    error: (error) => {
      console.error(error);
    }

  });

}

  goToCreateClaim(): void {

  this.router.navigate(['/claims/create']);

}

viewClaim(id: number): void {

  this.router.navigate(['/claims/view', id]);

}

editClaim(id: number): void {

  this.router.navigate(['/claims/edit', id]);

}

deleteClaim(id: number): void {

  const confirmed = confirm(
    'Are you sure you want to delete this claim?'
  );

  if (!confirmed) {

    return;

  }

  this.claimService
    .deleteClaim(id)
    .subscribe({

      next: () => {

        alert('Claim deleted successfully!');

        this.loadClaims();

      },

      error: error => {

        console.error(error);

        alert('Unable to delete claim.');

      }

    });

}
}