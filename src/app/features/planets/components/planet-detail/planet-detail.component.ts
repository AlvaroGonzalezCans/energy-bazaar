import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HasPermissionDirective } from '../../../../core/auth/permissions.directive';
import { PlanetsService } from '../../planets.service';
import { Planet } from '../../../../shared/models/planet.model';

@Component({
  standalone: true,
  selector: 'app-planet-detail',
  imports: [CommonModule, HasPermissionDirective],
  templateUrl: './planet-detail.component.html',
})
export class PlanetDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(PlanetsService);

  planet = signal<Planet | null>(null);
  activeTab = signal<'overview' | 'risk' | 'financials'>('overview');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe(p => this.planet.set(p ?? null));
  }

  selectTab(tab: 'overview' | 'risk' | 'financials') {
    this.activeTab.set(tab);
  }
}
