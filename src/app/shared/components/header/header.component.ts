import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { AuthService } from '../../../core/auth/auth.service';
import { HasPermissionDirective } from '../../../core/auth/permissions.directive';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, LogoutButtonComponent, TranslateModule, HasPermissionDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent {
  auth = inject(AuthService);

  user = this.auth.user;
}
