import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SafetyMetricsDigitPanelComponent } from './safety-metrics-digit-panel.component';


const meta: Meta<SafetyMetricsDigitPanelComponent> = {
	component: SafetyMetricsDigitPanelComponent,
	title: 'SafetyMetricsDigitPanel',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule]
		})
	]
};

export default meta;
type Story = StoryObj<SafetyMetricsDigitPanelComponent>;

export const Primary: Story = {
	args: {
		safetyMetrics: {
			planetOsmLineId: 21314,
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
		}
	}
};

export const Loading: Story = {
	args: {
		safetyMetrics: undefined
	}
}
