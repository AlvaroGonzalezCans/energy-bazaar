import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss']
})
export class AdminPage {
  routerService = inject(Router)
  listKeys = ['manage-users', 'freeze-trades', 'adjust-market'];

  handleBack(): void {
    this.routerService.navigateByUrl('/dashboard');
  }
}
