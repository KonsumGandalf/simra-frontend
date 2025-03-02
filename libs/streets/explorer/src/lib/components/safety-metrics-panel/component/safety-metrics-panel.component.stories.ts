import 'reflect-metadata';

import { NgxsModule } from '@ngxs/store';
import { StorybookTranslateModule } from '@simra/helpers';
import { StreetDetailState } from '@simra/streets-domain';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { fakeSafetyMetricsService } from '../../../utils/storybook-utils';
import { SafetyMetricsPanelComponent } from './safety-metrics-panel.component';


const meta: Meta<SafetyMetricsPanelComponent> = {
	component: SafetyMetricsPanelComponent,
	title: 'SafetyMetricsPanel',
	decorators: [
		moduleMetadata({
			imports: [
				StorybookTranslateModule,
				NgxsModule.forRoot([StreetDetailState]),
			],
			providers: [
				{ provide: SafetyMetricsService, useValue: fakeSafetyMetricsService }
			],
		}),
	],
};
export default meta;
type Story = StoryObj<SafetyMetricsPanelComponent>;

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
						safetyMetrics$: () => undefined,
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
