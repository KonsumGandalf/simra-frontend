import type { Meta, StoryObj } from '@storybook/angular';
import { MarkerClusterMapPage } from './marker-cluster-map.page';

const meta: Meta<MarkerClusterMapPage> = {
	component: MarkerClusterMapPage,
	title: 'MarkerClusterMapPage',
};
export default meta;
type Story = StoryObj<MarkerClusterMapPage>;

export const Primary: Story = {
	args: {},
};
