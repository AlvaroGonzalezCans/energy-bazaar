// core/auth/roles.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivate = (allowedRoles: string[]): CanActivateFn => {
  return (): boolean | UrlTree => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      return router.parseUrl('/login');
    }

    const userRoles = auth.roles();
    const allowed = allowedRoles.length === 0 || allowedRoles.some(r => userRoles.includes(r));

    return allowed ? true : router.parseUrl('/login');
  };
};
