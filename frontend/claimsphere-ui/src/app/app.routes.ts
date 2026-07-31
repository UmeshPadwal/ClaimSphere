import { Routes } from '@angular/router';
import { CreateClaimComponent } from './features/claims/pages/create-claim/create-claim';

export const routes: Routes = [

  {
    path: '',
    component: CreateClaimComponent,
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard')
            .then(m => m.Dashboard)
      }
    ],
  }
  
  
];