// features/dashboard/components/stream-speed-controls.component.ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '../../dashboard.store';

@Component({
    selector: 'app-stream-speed-controls',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'stream-speed-controls.component.html',
    styleUrls: ['stream-speed-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamSpeedControlsComponent {
    store = inject(DashboardStore);

    set(p: 'slow' | 'normal' | 'fast') {
        this.store.setSpeedProfile(p);
    }
}
