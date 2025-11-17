import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface JwtPayload {
  sub: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
  locale?: string;
  exp?: number;
}

export interface User {
  id: string;
  name?: string;
  roles: string[];
  permissions: string[];
  locale?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  private _user = signal<User | null>(this.restoreUserFromStorage());
  readonly user = computed(() => this._user());
  readonly roles = computed(() => this._user()?.roles ?? []);
  readonly isAuthenticated = computed(() => {
    const user = this._user();
    if (!user) return false;

    return this.isTokenValid();
  });

  accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  login(username: string, password: string) {
    return new Observable<{ accessToken: string }>(observer => {
      const now = Math.floor(Date.now() / 1000);

      setTimeout(() => {
        if (
          (username === 'admin' && password === 'admin') ||
          (username === 'trader' && password === '1234') ||
          (username === 'viewer' && password === 'viewer')
        ) {
          const mockPayload = {
            sub: username,
            name: username.toUpperCase(),
            roles:
              username === 'admin'
                ? ['admin']
                : username === 'trader'
                  ? ['trader']
                  : ['viewer'],
            permissions:
              username === 'admin'
                ? ['trade:view', 'trade:approve', 'trade:freeze', 'planet:read']
                : username === 'trader'
                  ? ['trade:view', 'trade:propose']
                  : ['trade:view'],
            exp: now + 30 * 60 // 30 minutos
          };

          const accessToken = this.createFakeJwt(mockPayload);
          localStorage.setItem('access_token', accessToken);
          this._user.set({
            id: mockPayload.sub,
            name: mockPayload.name,
            roles: mockPayload.roles,
            permissions: mockPayload.permissions
          });

          observer.next({ accessToken });
          observer.complete();
        } else {
          observer.error('Invalid credentials');
        }
      }, 600);
    });
  }

  /** Simula un JWT base64 válido */
  private createFakeJwt(payload: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    return `${header}.${body}.signature`;
  }

  logout() {
    localStorage.removeItem('access_token');
    this._user.set(null);
    this.router.navigateByUrl('/login');
  }

  handle401(req: HttpRequest<any>, next: HttpHandlerFn) {
    this.logout();
    return next(req);
  }

  hasAnyPermission(perms: string[]): boolean {
    const userPerms = this._user()?.permissions ?? [];
    return perms.some(p => userPerms.includes(p));
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

isTokenValid(): boolean {
  const token = this.accessToken();
  if (!token) return false;

  const payload = this.decodeJwt(token);
  if (!payload) return false;

  if (!payload.exp) return true;

  const nowMs  = Date.now();
  const expMs  = payload.exp * 1000;
  return expMs > nowMs;
}

  private restoreUserFromStorage(): User | null {
    const token = this.accessToken();
    if (!token) return null;
    try {
      const p = this.decodeJwt(token);
      return {
        id: p.sub,
        name: p.name,
        roles: p.roles ?? [],
        permissions: p.permissions ?? [],
        locale: p.locale
      };
    } catch {
      return null;
    }
  }

  private decodeJwt(token: string): JwtPayload {
    const [, payload] = token.split('.');
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  }
}
