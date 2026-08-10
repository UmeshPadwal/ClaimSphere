import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClaimService } from '../../services/claim.service';
import { ClaimRequest } from '../../models/claim-request';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-claim.html',
  styleUrl: './create-claim.css'
})
export class CreateClaimComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimService);

  isEditMode = false;
  claimId!: number;

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';

  claimTypes = [
    'Vehicle',
    'Health',
    'Property',
    'Travel'
  ];

  cities = [
    'Pune',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad'
  ];

  statuses = [
    'OPEN',
    'PENDING',
    'IN_PROGRESS',
    'CLOSED'
  ];

  claimForm = this.fb.group({

    claimNumber: [
      '',
      [
        Validators.required,
        Validators.maxLength(30)
      ]
    ],

    policyNumber: [
      '',
      [
        Validators.required,
        Validators.maxLength(30)
      ]
    ],

    customerName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    claimType: [
      '',
      Validators.required
    ],

    city: [
      '',
      Validators.required
    ],

    status: [
      'OPEN',
      Validators.required
    ],

    amount: [
      null as number | null,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    incidentDate: [
      '',
      Validators.required
    ],

    reportedDate: [
      '',
      Validators.required
    ]

  });

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.isEditMode = true;
        this.claimId = Number(id);

        this.loadClaim();

      }

    });

  }


  /**
   * Load existing claim when editing.
   */
  private loadClaim(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.claimService
      .getClaimById(this.claimId)
      .subscribe({

        next: (response) => {

          this.claimForm.patchValue({

            claimNumber: response.claimNumber,
            policyNumber: response.policyNumber,
            customerName: response.customerName,
            claimType: response.claimType,
            city: response.city,
            status: response.status,
            amount: response.amount,
            incidentDate: response.incidentDate,
            reportedDate: response.reportedDate

          });

          this.isLoading = false;

        },

        error: (error) => {

          console.error(
            'Unable to load claim:',
            error
          );

          this.errorMessage =
            'Unable to load claim details. Please try again.';

          this.isLoading = false;

        }

      });

  }


  /**
   * Submit create/update form.
   */
  onSubmit(): void {

    if (this.claimForm.invalid) {

      this.claimForm.markAllAsTouched();

      return;

    }

    if (this.isSubmitting) {
      return;
    }

    const request =
      this.claimForm.getRawValue() as ClaimRequest;

    this.isSubmitting = true;
    this.errorMessage = '';

    if (this.isEditMode) {

      this.updateClaim(request);

    } else {

      this.createClaim(request);

    }

  }


  /**
   * Create new claim.
   */
  private createClaim(
    request: ClaimRequest
  ): void {

    this.claimService
      .createClaim(request)
      .subscribe({

        next: () => {

          alert(
            'Claim created successfully!'
          );

          this.router.navigate([
            '/claims'
          ]);

        },

        error: (error) => {

          console.error(
            'Unable to create claim:',
            error
          );

          this.errorMessage =
            'Unable to create claim. Please try again.';

          this.isSubmitting = false;

        }

      });

  }


  /**
   * Update existing claim.
   */
  private updateClaim(
    request: ClaimRequest
  ): void {

    this.claimService
      .updateClaim(
        this.claimId,
        request
      )
      .subscribe({

        next: () => {

          alert(
            'Claim updated successfully!'
          );

          this.router.navigate([
            '/claims'
          ]);

        },

        error: (error) => {

          console.error(
            'Unable to update claim:',
            error
          );

          this.errorMessage =
            'Unable to update claim. Please try again.';

          this.isSubmitting = false;

        }

      });

  }


  /**
   * Cancel create/edit operation.
   */
  cancel(): void {

    this.router.navigate([
      '/claims'
    ]);

  }


  /**
   * Retry loading claim.
   */
  retry(): void {

    if (this.isEditMode) {

      this.loadClaim();

    }

  }


  /**
   * Template helpers.
   */
  hasError(
    controlName: string,
    errorName: string
  ): boolean {

    const control =
      this.claimForm.get(controlName);

    return !!(
      control &&
      control.hasError(errorName) &&
      control.touched
    );

  }

}