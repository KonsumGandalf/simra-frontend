import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { StreetAnalyticsService } from '../../../services/street-analytics.service';
import { fakeSafetyMetricsService } from '../../../utils/storybook-utils';
import { SafetyMetricsCardComponent } from './safety-metrics-card.component';

const meta: Meta<SafetyMetricsCardComponent> = {
	component: SafetyMetricsCardComponent,
	title: 'SafetyMetricsCardComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule],
			providers: [
				{ provide: SafetyMetricsService, useValue: fakeSafetyMetricsService },
				{ provide: StreetAnalyticsService, useValue: {} },
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
