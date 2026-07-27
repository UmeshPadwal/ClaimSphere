import { Routes } from '@angular/router';

export const routes: Routes = [
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
    ]
  }
];