import { FormsModule } from '@angular/forms';
import { StorybookTranslateModule } from '@simra/helpers';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TableModule } from 'primeng/table';
import { NumberFilterComponent } from './number-filter.component';

const meta: Meta<NumberFilterComponent> = {
	component: NumberFilterComponent,
	title: 'NumberFilterComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule, FormsModule, TableModule]
		}),
		componentWrapperDecorator((story) => `
			<p-table style="height: 20em;width: 20rem" #dt [value]="[]">
				<ng-template pTemplate="header">
					${story}
				</ng-template>
			</p-table>`),
	]
};
export default meta;
type Story = StoryObj<NumberFilterComponent>;

export const Primary: Story = {
	args: {
		field: 'minNumberOfRides',
		step: 10,
		min: 0,
		defaultValue: 15,
	}
};
