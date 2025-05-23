import { RouterTestingModule } from '@angular/router/testing';
import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';
import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SafetyMetricsDigitPanelComponent } from './safety-metrics-digit-panel.component';

const meta: Meta<SafetyMetricsDigitPanelComponent> = {
	component: SafetyMetricsDigitPanelComponent,
	title: 'SafetyMetricsDigitPanel',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, RouterTestingModule],
		}),
	],
};

export default meta;
type Story = StoryObj<SafetyMetricsDigitPanelComponent>;

export const Primary: Story = {
	args: {
		safetyMetrics: {
			numberOfRides: 206,
			numberOfIncidents: 7,
			numberOfScaryIncidents: 3,
			dangerousScore: 0.03,
			numberOfClosePasses: 5,
			numberOfPullInOuts: 1,
			numberOfNearLeftRightHooks: 2,
			numberOfHeadOnApproaches: 4,
			numberOfTailgating: 2,
			numberOfNearDoorings: 0,
			numberOfObstacleDodges: 1,
			dangerousColor: '#FF0000',
			weekDay: EWeekDays.WEEK,
			trafficTime: ETrafficTimes.ALL_DAY,
			year: EYear.ALL,
			lastModified: new Date(),
		},
	},
};

export const Loading: Story = {
	args: {
		safetyMetrics: undefined,
	},
};
