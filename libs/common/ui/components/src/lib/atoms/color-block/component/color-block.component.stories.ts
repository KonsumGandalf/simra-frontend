import { EDangerousColors } from '@simra/common-models';
import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ColorBlockComponent } from './color-block.component';

const meta: Meta<ColorBlockComponent> = {
	component: ColorBlockComponent,
	title: 'ColorBlock',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule]
		})
	]
};
export default meta;
type Story = StoryObj<ColorBlockComponent>;


export const Default: Story = {
	args: {
		color: EDangerousColors.AMBER_500
	},
	argTypes: {
		color: {
			control: {
				type: 'select',
				labels: {
					[EDangerousColors.AMBER_500]: 'Amber 500',
					[EDangerousColors.RED_500]: 'Red 500',
					[EDangerousColors.ORANGE_500]: 'Orange 500',
					[EDangerousColors.GREEN_500]: 'Green 500',
					[EDangerousColors.NEUTRAL_200]: 'Neutral 200',
					[EDangerousColors.LIME_500]: 'Lime 500',
				}
			},
			options: Object.values(EDangerousColors),
		}
	}
};
