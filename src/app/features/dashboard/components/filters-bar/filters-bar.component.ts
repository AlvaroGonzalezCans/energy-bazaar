import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'filters-bar.component.html',
  styleUrls: ['filters-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersBarComponent {
  @Output() filterChange = new EventEmitter<{ planet?: string; type?: string }>();

  private filters: { planet?: string; type?: string } = {};

  onPlanetChange(e: Event) {
    this.filters.planet = (e.target as HTMLSelectElement).value;
    this.filterChange.emit(this.filters);
  }

  onTypeChange(e: Event) {
    this.filters.type = (e.target as HTMLSelectElement).value;
    this.filterChange.emit(this.filters);
  }
}
