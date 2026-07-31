import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';

import { ClaimRequest } from '../models/claim-request';
import { ClaimResponse } from '../models/claim-response';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private http = inject(HttpClient);

  private readonly apiUrl =
  `${environment.apiUrl}/claims`;

  createClaim(request: ClaimRequest): Observable<ClaimResponse> {

  return this.http.post<ClaimResponse>(
    this.apiUrl,
    request
  );

}

}