import { Routes } from '@angular/router';
import { CreateClaimComponent } from './features/claims/pages/create-claim/create-claim';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'claims',
    pathMatch: 'full'
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
},

];