import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-profile-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6">
    <h1 class="text-2xl font-bold text-sky-500 mb-4">🪐 Planet Profile</h1>
    <p>Currently viewing planet: <strong>{{ planetId }}</strong></p>
    <p class="mt-2 text-gray-500 text-sm">Planetary energy data, climate risk, and trading stats will appear here.</p>
  </div>
  `
})
export class PlanetProfilePage {
  planetId: string | null = null;
  constructor(private route: ActivatedRoute) {
    this.planetId = this.route.snapshot.paramMap.get('id');
  }
}
