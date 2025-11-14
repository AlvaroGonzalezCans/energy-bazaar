import { Routes } from '@angular/router';
import { canActivate } from './core/auth/roles.guard';
import { authGuard } from './core/auth/auth.guard';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage) },
  {
    path: '',
    canActivate: [authGuard, canActivate(['viewer','trader','admin'])],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'trades/:id', loadComponent: () => import('./features/trades/trade.page').then(m => m.TradeDetailPage) },
      { path: 'planets/:id', loadComponent: () => import('./features/planets/planet.page').then(m => m.PlanetProfilePage) },
      {
        path: 'admin',
        canActivate: [canActivate(['admin','council'])],
        loadComponent: () => import('./features/admin/admin.page').then(m => m.AdminPage)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
