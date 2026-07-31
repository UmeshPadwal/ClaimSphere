import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ClaimService } from '../../services/claim.service';
import { ClaimRequest } from '../../models/claim-request';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-claim.html',
  styleUrl: './create-claim.css'
})
export class CreateClaimComponent {

  

  private fb = inject(FormBuilder);

  private claimService = inject(ClaimService);

 claimForm = this.fb.group({

  claimNumber: [
    '',
    Validators.required
  ],

  policyNumber: [
    '',
    Validators.required
  ],

  status: [
    'OPEN',
    Validators.required
  ],

  amount: [
    0,
    [
      Validators.required,
      Validators.min(1)
    ]
  ]

});

onSubmit(): void {

  if (this.claimForm.invalid) {
    this.claimForm.markAllAsTouched();
    return;
  }
this.claimService
  .createClaim(this.claimForm.getRawValue() as ClaimRequest)
  .subscribe({

    next: (response) => {

      console.log('Claim Created Successfully');
      console.log(response);

      alert('Claim created successfully!');

      this.claimForm.reset({
        claimNumber: '',
        policyNumber: '',
        status: 'OPEN',
        amount: 0
      });

    },

    error: (error) => {

      console.error(error);

      alert('Something went wrong!');

    }

  });

}

}

