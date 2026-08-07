import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./core/layout/app-layout/app-layout')
        .then(m => m.AppLayoutComponent),

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'claims',
        loadComponent: () =>
          import('./features/claims/pages/claim-list/claim-list')
            .then(m => m.ClaimListComponent)
      },

      {
        path: 'claims/create',
        loadComponent: () =>
          import('./features/claims/pages/create-claim/create-claim')
            .then(m => m.CreateClaimComponent)
      },

      {
        path: 'claims/edit/:id',
        loadComponent: () =>
          import('./features/claims/pages/create-claim/create-claim')
            .then(m => m.CreateClaimComponent)
      },

      {
        path: 'claims/view/:id',
        loadComponent: () =>
          import('./features/claims/pages/claim-detail/claim-detail')
            .then(m => m.ClaimDetailComponent)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];