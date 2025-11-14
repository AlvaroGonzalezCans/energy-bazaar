import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginApi {
  login(username: string, password: string): Observable<{ accessToken: string; user: any }> {
    if (username === 'admin' && password === 'admin') {
      return of({
        accessToken: 'fake-jwt-admin',
        user: { id: 1, name: 'Admin', roles: ['admin'], permissions: ['trade:approve', 'trade:freeze'] }
      }).pipe(delay(500));
    }

    if (username === 'trader' && password === '1234') {
      return of({
        accessToken: 'fake-jwt-trader',
        user: { id: 2, name: 'Trader', roles: ['trader'], permissions: ['trade:propose', 'trade:view'] }
      }).pipe(delay(500));
    }

    return of({
      accessToken: 'fake-jwt-viewer',
      user: { id: 3, name: 'Viewer', roles: ['viewer'], permissions: ['trade:view'] }
    }).pipe(delay(500));
  }
}
