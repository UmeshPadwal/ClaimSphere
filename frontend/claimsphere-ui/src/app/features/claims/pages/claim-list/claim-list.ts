import { Component, inject, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass
} from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ClaimService } from '../../services/claim.service';
import { ClaimResponse } from '../../models/claim-response';
import { Router } from '@angular/router';

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

  page = 0;
  size = 10;

  totalElements = 0;
  totalPages = 0;

  keyword = '';
  status = '';
  city = '';
  claimType = '';

  sortBy = 'id';
  direction = 'asc';

  isSearching = false;

  searchControl = new FormControl('');

  statuses = [
    '',
    'OPEN',
    'PENDING',
    'IN_PROGRESS',
    'CLOSED'
  ];

  claimTypes = [
    '',
    'Vehicle',
    'Health',
    'Property',
    'Travel'
  ];

  cities = [
    '',
    'Pune',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Ahmedabad',
    'Kolkata'
  ];

  ngOnInit(): void {

    this.loadClaims();

    this.searchControl.valueChanges
      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )
      .subscribe(value => {

        this.keyword = value?.trim() ?? '';

        this.isSearching = this.keyword.length > 0;

        this.page = 0;

        this.loadClaims();

      });

  }

  private loadClaims(): void {

    this.claimService.getClaimsPage(

      this.page,

      this.size,

      this.keyword,

      this.status,

      this.city,

      this.claimType,

      this.sortBy,

      this.direction

    ).subscribe({

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

  onStatusChange(event: Event): void {

    this.status = (event.target as HTMLSelectElement).value;

    this.page = 0;

    this.loadClaims();

  }

  onClaimTypeChange(event: Event): void {

    this.claimType = (event.target as HTMLSelectElement).value;

    this.page = 0;

    this.loadClaims();

  }

  onCityChange(event: Event): void {

    this.city = (event.target as HTMLSelectElement).value;

    this.page = 0;

    this.loadClaims();

  }

  clearFilters(): void {

    this.status = '';

    this.city = '';

    this.claimType = '';

    this.keyword = '';

    this.searchControl.setValue('', {

      emitEvent: false

    });

    this.page = 0;

    this.loadClaims();

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

    if (!confirm('Are you sure you want to delete this claim?')) {

      return;

    }

    this.claimService.deleteClaim(id).subscribe({

      next: () => {

        this.loadClaims();

      },

      error: error => {

        console.error(error);

      }

    });

  }

}