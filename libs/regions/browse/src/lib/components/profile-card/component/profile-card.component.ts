import { ChangeDetectionStrategy, Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartDirective, LastRunComponent } from '@simra/common-components';
import { IProfileGroupAssociation } from '@simra/models';
import { PrimeTemplate } from 'primeng/api';
import { Card } from 'primeng/card';
import { UIChart } from 'primeng/chart';
import { Divider } from 'primeng/divider';
import { ProfileSafetyMetricsService } from '../services/profile-safety-metrics.service';

@Component({
	selector: 't-profile-card',
	imports: [
		CommonModule,
		Divider,
		UIChart,
		Card,
		TranslatePipe,
		ChartDirective,
		PrimeTemplate,
		LastRunComponent,
	],
	templateUrl: './profile-card.component.html',
	styleUrl: './profile-card.component.scss',
	host: {
		class: 't-profile-card',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
	groupedProfileSafetyMetrics = input.required<IProfileGroupAssociation[]>();
	lastRun = input.required<Date>();

	private readonly _profileSafetyMetricsService = inject(ProfileSafetyMetricsService);

	constructor() {
		effect(() => {
			const groupedProfileSafetyMetrics = this.groupedProfileSafetyMetrics();
			if (!groupedProfileSafetyMetrics) {
				return;
			}

			this._profileSafetyMetricsService.safetyMetrics$.set(groupedProfileSafetyMetrics);
		});
	}

	lineChartAgeOptions = this._profileSafetyMetricsService.barChartAgeOptions();
	translationPrefix = 'REGIONS.BROWSE.COMPONENTS.PROFILE_CARD.GROUPS';
	metricsArray = [
		{
			dataSignal: this._profileSafetyMetricsService.barChartBehaviourMetrics$,
			group: this.translationPrefix + '.BEHAVIOR',
			anker: 'behavior',
		},
		{
			dataSignal: this._profileSafetyMetricsService.barChartExperienceMetrics$,
			group: this.translationPrefix + '.EXPERIENCE',
			anker: 'experience',
		},
		{
			dataSignal: this._profileSafetyMetricsService.barChartGenderMetrics$,
			group: this.translationPrefix + '.GENDER',
			anker: 'gender',
		},
		{
			dataSignal: this._profileSafetyMetricsService.barChartAgeMetrics$,
			group: this.translationPrefix + '.AGE',
			anker: 'age',
		},
	];
}
