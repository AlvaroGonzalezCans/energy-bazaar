import { Routes } from '@angular/router';
import { canActivate } from './core/auth/roles.guard';
import { authGuard } from './core/auth/auth.guard';
import { canViewPlanetsGuard } from './features/planets/planets.guard';
import { PlanetDetailComponent } from './features/planets/components/planet-detail/planet-detail.component';
import { PlanetPage } from './features/planets/planet.page';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage) },
  {
    path: '',
    canActivate: [authGuard, canActivate(['viewer','trader','admin'])],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'trades/:id', loadComponent: () => import('./features/trades/trade.page').then(m => m.TradeDetailPage) },
      {
        path: 'admin',
        canActivate: [canActivate(['admin','council'])],
        loadComponent: () => import('./features/admin/admin.page').then(m => m.AdminPage)
      },
      { 
        path: 'proposals',
        canActivate: [authGuard, canActivate(['trader','admin','council'])],
        loadComponent: () => import('./features/proposals/proposals.page').then(m => m.ProposalsPage)
      },
      {
        path: 'planets',
        canActivate: [canViewPlanetsGuard],
        children: [
          { path: '', pathMatch: 'full', component: PlanetPage },
          { path: ':id', component: PlanetDetailComponent },
        ],
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
