import { RouterTestingModule } from '@angular/router/testing';
import { StorybookTranslateModule } from '@simra/helpers';
 
// import { fakeSafetyMetricsService, StreetAnalyticsService } from '../../../../../../../../streets/explorer/src/lib/public-api';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SafetyMetricsService } from '../services/safety-metrics.service';
import { SafetyMetricsCardComponent } from './safety-metrics-card.component';

const meta: Meta<SafetyMetricsCardComponent> = {
	component: SafetyMetricsCardComponent,
	title: 'SafetyMetricsCardComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, RouterTestingModule],
			providers: [
				// { provide: SafetyMetricsService, useValue: fakeSafetyMetricsService },
				// { provide: StreetAnalyticsService, useValue: {} },
			],
		}),
	],
};
export default meta;
type Story = StoryObj<SafetyMetricsCardComponent>;

export const Primary: Story = {
	args: {},
};

export const Loading: Story = {
	decorators: [
		moduleMetadata({
			providers: [
				{
					provide: SafetyMetricsService,
					useValue: {
						pieMetricsIncidentTypesData$: () => undefined,
						getPieMetricsIncidentTypesOptions: () => ({}),
						barMetricsRideIncidentDistributionData$: () => undefined,
						getBarMetricsRideIncidentDistributionOptions: () => ({}),
					},
				},
			],
		}),
	],
};
