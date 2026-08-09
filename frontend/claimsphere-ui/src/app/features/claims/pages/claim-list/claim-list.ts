import { Component, inject, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass
} from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClaimService } from '../../services/claim.service';
import { ClaimResponse } from '../../models/claim-response';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  templateUrl: './claim-list.html',
  styleUrl: './claim-list.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    DecimalPipe,
    NgClass
  ]
})
export class ClaimListComponent implements OnInit {

  private claimService = inject(ClaimService);
  private router = inject(Router);

  claims: ClaimResponse[] = [];
  isSearching = false;

  page = 0;

  size = 10;

  totalElements = 0;

  totalPages = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {
    console.log('ClaimListComponent initialized');
    this.loadClaims();

    this.searchControl.valueChanges
      .pipe(

        debounceTime(300),

        distinctUntilChanged(),

        switchMap(value => {

          this.isSearching = !!value?.trim();

          if (!value?.trim()) {

            this.loadClaims();

            return [];

          }

          return this.claimService.searchClaims(value);

        })

      )
      .subscribe({

        next: response => {

          this.claims = response;

        },

        error: error => {

          console.error(error);

        }

      });

  }

  private loadClaims(): void {

    this.claimService
      .getClaimsPage(this.page, this.size)
      .subscribe({

        next: response => {

          this.claims = response.content;

          this.totalElements = response.totalElements;

          this.totalPages = response.totalPages;

        },

        error: error => {

          console.error(error);

        }

      });

  }

  nextPage(): void {

    if (this.page < this.totalPages - 1) {

      this.page++;

      this.loadClaims();

    }

  }

  previousPage(): void {

    if (this.page > 0) {

      this.page--;

      this.loadClaims();

    }

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