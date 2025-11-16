import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return router.parseUrl('/login');
  }

  if (state.url === '/' || state.url === '') {
    return router.parseUrl('/dashboard');
  }

  return true;
};
