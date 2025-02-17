import type { Meta, StoryObj } from '@storybook/angular';
import { MapPage } from './map.page';

const meta: Meta<MapPage> = {
	component: MapPage,
	title: 'MapPage',
};
export default meta;
type Story = StoryObj<MapPage>;

export const Primary: Story = {
	args: {},
};
