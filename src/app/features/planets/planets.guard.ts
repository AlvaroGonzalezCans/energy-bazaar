import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

export const canViewPlanetsGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const canView = auth.hasAnyPermission(['planet:read']);

  if (canView) return true;

  return router.parseUrl('/dashboard');
};
