import { FormsModule } from '@angular/forms';
import { TRAFFIC_TIMES_TO_TRANSLATION } from '../../../translations/maps/traffic-times-to-translation';
import { ETrafficTimes } from '@simra/common-models';
import { StorybookTranslateModule } from '@simra/helpers';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { EnumSelectComponent } from './enum-select.component';

const meta: Meta<EnumSelectComponent> = {
	component: EnumSelectComponent,
	title: 'EnumSelectComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, FormsModule]
		}),
		componentWrapperDecorator((story) => `<div style="height: 20em;width: 20rem">${story}</div>`),

	]
};
export default meta;
type Story = StoryObj<EnumSelectComponent>;

export const Primary: Story = {
	args: {
		field: 'trafficTimes',
		filter: false,
		translationMap: TRAFFIC_TIMES_TO_TRANSLATION,
		optionEnum: ETrafficTimes,
		selected: [ETrafficTimes.ALL_DAY]
	}
};
