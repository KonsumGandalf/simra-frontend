import { Store } from '@ngxs/store';
import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DangerousScoreBarComponent } from './dangerous-score-bar.component';

const meta: Meta<DangerousScoreBarComponent> = {
	component: DangerousScoreBarComponent,
	title: 'DangerousScoreBarComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule],
			providers: [
				{
					provide: Store,
					useValue: {},
				}
			]
		})
	]
};
export default meta;
type Story = StoryObj<DangerousScoreBarComponent>;

export const Default: Story = {
	args: {},
};
