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

  console.log('View Claim:', id);

}

editClaim(id: number): void {

  console.log('Edit Claim:', id);

}

deleteClaim(id: number): void {

  console.log('Delete Claim:', id);

}
}