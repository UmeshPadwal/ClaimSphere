import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  token: string;
  username?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private readonly apiUrl =`${environment.apiUrl}/auth`;

  private readonly tokenKey = 'claimsphere_token';
  private readonly usernameKey = 'claimsphere_username';
  private readonly roleKey = 'claimsphere_role';

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            this.tokenKey,
            response.token
          );

          if (response.username) {

            localStorage.setItem(
              this.usernameKey,
              response.username
            );
          }

          if (response.role) {

            localStorage.setItem(
              this.roleKey,
              response.role
            );
          }

        })

      );
  }

  getToken(): string | null {

    return localStorage.getItem(
      this.tokenKey
    );
  }

  getUsername(): string | null {

    return localStorage.getItem(
      this.usernameKey
    );
  }

  getRole(): string | null {

    return localStorage.getItem(
      this.roleKey
    );
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  logout(): void {

    localStorage.removeItem(
      this.tokenKey
    );

    localStorage.removeItem(
      this.usernameKey
    );

    localStorage.removeItem(
      this.roleKey
    );
  }
}