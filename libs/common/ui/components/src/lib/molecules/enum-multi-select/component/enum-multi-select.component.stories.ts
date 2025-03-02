import { FormsModule } from '@angular/forms';
import { TRAFFIC_TIMES_TO_TRANSLATION } from '../../../translations/maps/traffic-times-to-translation';
import { ETrafficTimes } from '@simra/common-models';
import { StorybookTranslateModule } from '@simra/helpers';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { EnumMultiSelectComponent } from './enum-multi-select.component';

const meta: Meta<EnumMultiSelectComponent> = {
	component: EnumMultiSelectComponent,
	title: 'EnumMultiSelectComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, FormsModule]
		}),
		componentWrapperDecorator((story) => `<div style="height: 20em;width: 20rem">${story}</div>`),

	]
};
export default meta;
type Story = StoryObj<EnumMultiSelectComponent>;

export const Primary: Story = {
	args: {
		field: 'trafficTimes',
		filter: true,
		maxSelectedDisplay: 2,
		translationMap: TRAFFIC_TIMES_TO_TRANSLATION,
		optionEnum: ETrafficTimes,
		selected: [ETrafficTimes.ALL_DAY]
	}
};
