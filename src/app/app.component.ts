import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';


@Component({
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-not-found',
    }
})
export class AppComponent implements OnInit {
    ngOnInit() {
        Chart.register(annotationPlugin);
    }
}
