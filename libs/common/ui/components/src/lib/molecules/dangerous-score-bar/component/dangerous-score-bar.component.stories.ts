import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DangerousScoreBarComponent } from './dangerous-score-bar.component';

const meta: Meta<DangerousScoreBarComponent> = {
	component: DangerousScoreBarComponent,
	title: 'DangerousScoreBarComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule]
		})
	]
};
export default meta;
type Story = StoryObj<DangerousScoreBarComponent>;

export const Default: Story = {
	args: {},
};
