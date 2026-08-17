import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = false;
  errorMessage = '';

  loginForm = this.fb.group({

    username: [ '',[Validators.required]],
    password: ['',[Validators.required]]

  });

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.errorMessage = '';

    this.isLoading = true;

    const request = {
      username:this.loginForm.value.username ?? '',
      password:this.loginForm.value.password ?? ''
    };

    this.authService
      .login(request)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate([
            '/dashboard'
          ]);
        },
        error: error => {
          this.isLoading = false;
          console.error(
            'Login failed:',
            error
          );
          if (error.status === 401) {
            this.errorMessage =
              'Invalid username or password.';
          } else {
            this.errorMessage =
              'Unable to login. Please try again.';
          }
        }
      });
  }
}