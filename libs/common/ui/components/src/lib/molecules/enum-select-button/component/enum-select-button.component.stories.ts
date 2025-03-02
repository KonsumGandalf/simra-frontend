import { FormsModule } from '@angular/forms';
import { WEEK_DAYS_TO_TRANSLATION } from '../../../translations/maps/week-days-to-translation';
import { EWeekDays } from '@simra/common-models';
import { StorybookTranslateModule } from '@simra/helpers';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { EnumSelectButtonComponent } from './enum-select-button.component';

const meta: Meta<EnumSelectButtonComponent> = {
	component: EnumSelectButtonComponent,
	title: 'EnumSelectButtonComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, FormsModule]
		}),
		componentWrapperDecorator((story) => `<div style="height: 20em;width: 20rem">${story}</div>`),

	]
};
export default meta;
type Story = StoryObj<EnumSelectButtonComponent>;

export const Primary: Story = {
	args: {
		size: 'small',
		translationMap: WEEK_DAYS_TO_TRANSLATION,
		optionEnum: EWeekDays,
		selected: EWeekDays.WEEK,
		filterFunction: ((option: string) => !option.startsWith('ALL_'))
	}
};
