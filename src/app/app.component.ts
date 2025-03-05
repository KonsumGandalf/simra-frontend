import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { RootLayoutComponent } from './layouts/root/root.layout';


@Component({
	imports: [RouterModule, RootLayoutComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'app-not-found',
	},
})
export class AppComponent implements OnInit {
	ngOnInit() {
		Chart.register(annotationPlugin);
	}
}
