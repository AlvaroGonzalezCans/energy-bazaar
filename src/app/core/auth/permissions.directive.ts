// core/auth/permissions.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({ selector: '[hasPermission]' })
export class HasPermissionDirective {
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private auth = inject(AuthService);
  private current: string[] = [];

  @Input() set hasPermission(perms: string[] | string) {
    this.current = Array.isArray(perms) ? perms : [perms];
    this.render();
  }

  constructor() {
    effect(() => this.render());
  }

  private render() {
    this.vcr.clear();
    if (this.auth.hasAnyPermission(this.current)) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
