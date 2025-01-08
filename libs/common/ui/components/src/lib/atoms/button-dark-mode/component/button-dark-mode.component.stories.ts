import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonDarkModeComponent } from './button-dark-mode.component';

const meta: Meta<ButtonDarkModeComponent> = {
	component: ButtonDarkModeComponent,
	title: 'ButtonDarkMode',
};
export default meta;
type Story = StoryObj<ButtonDarkModeComponent>;

export const Primary: Story = {
	args: {},
};
