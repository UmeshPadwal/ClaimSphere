import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';

import { ClaimRequest } from '../models/claim-request';
import { ClaimResponse } from '../models/claim-response';
import { PageResponse } from '../../../shared/models/page-response';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/claims`;

  createClaim(request: ClaimRequest): Observable<ClaimResponse> {

    return this.http.post<ClaimResponse>(
      this.apiUrl,
      request
    );

  }

  getAllClaims(): Observable<ClaimResponse[]> {

    return this.http.get<ClaimResponse[]>(this.apiUrl);

  }

  getClaimsPage(

    page: number,

    size: number,

    keyword: string = '',

    status: string = '',

    city: string = '',

    claimType: string = '',

    sortBy: string = 'id',

    direction: string = 'asc'

  ): Observable<PageResponse<ClaimResponse>> {

    return this.http.get<PageResponse<ClaimResponse>>(

      `${this.apiUrl}/page`,

      {

        params: {

          page,

          size,

          keyword,

          status,

          city,

          claimType,

          sortBy,

          direction

        }

      }

    );

  }

  getClaimById(id: number): Observable<ClaimResponse> {

    return this.http.get<ClaimResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  updateClaim(
    id: number,
    request: ClaimRequest
  ): Observable<ClaimResponse> {

    return this.http.put<ClaimResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  deleteClaim(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


}