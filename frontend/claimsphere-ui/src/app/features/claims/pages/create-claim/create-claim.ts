import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ClaimService } from '../../services/claim.service';
import { ClaimRequest } from '../../models/claim-request';
import { Router, ActivatedRoute } from '@angular/router';

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


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.isEditMode = true;
        this.claimId = +id;

        this.loadClaim();

      }

    });

  }

  claimForm = this.fb.group({

    claimNumber: ['', Validators.required],

    policyNumber: ['', Validators.required],

    customerName: ['', Validators.required],

    claimType: ['', Validators.required],

    city: ['', Validators.required],

    status: ['', Validators.required],

    amount: [null as number | null, [Validators.required, Validators.min(1)]],

    incidentDate: ['', Validators.required],

    reportedDate: ['', Validators.required]

  });


  private loadClaim(): void {

    this.claimService
      .getClaimById(this.claimId)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.claimForm.patchValue({

            claimNumber: response.claimNumber,
            policyNumber: response.policyNumber,
            status: response.status,
            customerName: response.customerName,
            claimType: response.claimType,
            city: response.city,
            amount: response.amount,
            incidentDate: response.incidentDate,
            reportedDate: response.reportedDate

          });

        },

        error: (error) => {

          console.error(error);

        }

      });

  }



  onSubmit(): void {

    if (this.claimForm.invalid) {

      this.claimForm.markAllAsTouched();
      return;

    }

    const request =
      this.claimForm.getRawValue() as ClaimRequest;

    if (this.isEditMode) {

      this.updateClaim(request);

    } else {

      this.createClaim(request);

    }

  }

  private createClaim(request: ClaimRequest): void {

    this.claimService
      .createClaim(request)
      .subscribe({

        next: () => {

          alert('Claim created successfully!');

          this.router.navigate(['/claims']);

        },

        error: error => {

          console.error(error);

        }

      });

  }

  private updateClaim(request: ClaimRequest): void {

    this.claimService
      .updateClaim(this.claimId, request)
      .subscribe({

        next: () => {

          alert('Claim updated successfully!');

          this.router.navigate(['/claims']);

        },

        error: error => {

          console.error(error);

        }

      });

  }

  cancel(): void {

    this.router.navigate(['/claims']);

  }

}

