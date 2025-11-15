import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from '../../shared/models/planet.model';

@Injectable({ providedIn: 'root' })
export class PlanetsService {

	list(): Observable<Planet[]> {
		return of(this.buildMockPlanets());
	}

	getById(id: string): Observable<Planet | undefined> {
		const all = this.buildMockPlanets();
		return of(all.find(p => p.id === id));
	}

	private buildMockPlanets(): Planet[] {
		return [
			this.buildPlanet('earth', 'Earth'),
			this.buildPlanet('mars', 'Mars'),
			this.buildPlanet('ulthar', 'Ulthar'),
			this.buildPlanet('jovia', 'Jovia'),
			this.buildPlanet('vega', 'Vega'),
		];
	}

	private buildPlanet(id: string, name: string): Planet {
		const climateRiskIndex = this.randomInt(10, 90);
		const avgDailyEnergyConsumption = this.randomInt(500, 5000);
		const tradeExposureIndex = this.randomInt(0, 100);

		const ratings = ['AAA', 'AA', 'A', 'BBB', 'BB'];
		const creditRating = ratings[this.randomInt(0, ratings.length - 1)];
		const creditLine = this.randomInt(100, 2000); // millones

		return {
			id,
			name,
			shortDescription: `${name} is a key node in the Galactic Energy Bazaar.`,
			climateRiskIndex,
			avgDailyEnergyConsumption,
			creditRating,
			creditLine,
			tradeExposureIndex,
		};
	}

	private randomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
