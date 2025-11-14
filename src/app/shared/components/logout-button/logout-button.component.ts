// shared/components/logout-button/logout-button.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: 'logout-button.component.html',
  styleUrls: ['logout-button.component.scss']
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);

  onLogout() {
    this.auth.logout();
  }
}
