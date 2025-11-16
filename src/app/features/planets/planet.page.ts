import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanetsService } from './planets.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-planet-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: 'planet.page.html',
  styleUrls: ['planet.page.scss']
})
export class PlanetPage {
  planetId: string | null = null;
  private planetsService = inject(PlanetsService);
  planets$ = this.planetsService.list();
  constructor(private route: ActivatedRoute) {
    this.planetId = this.route.snapshot.paramMap.get('id');
  }
}
