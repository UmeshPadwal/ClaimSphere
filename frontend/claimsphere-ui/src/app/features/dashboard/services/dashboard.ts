import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardStats } from '../models/dashboard-stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/dashboard';

  getSummary(): Observable<DashboardStats> {

    return this.http.get<DashboardStats>(
      `${this.apiUrl}/summary`
    );

  }

}