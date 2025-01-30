import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { incidentTypeToIcon } from '../../models/maps/incident-type-to-icon';
import { participantToIcon } from '../../models/maps/participant-to-icon';
import { phoneLocationToIcon } from '../../models/maps/phone-location-to-icon';
import { IncidentIconComponent } from './incident-icon.component';

const allParticipantIcons = Object.values(participantToIcon).map(icon => icon.name);
const allPhoneLocationIcons = Object.values(incidentTypeToIcon).map(icon => icon.name);
const allIncidentTypeIcons = Object.values(phoneLocationToIcon).map(icon => icon.name);

const meta: Meta<IncidentIconComponent> = {
	component: IncidentIconComponent,
	title: 'Icon',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule],
		})
	],
	argTypes: {
		names: {
			options: [...allParticipantIcons, ...allPhoneLocationIcons, ...allIncidentTypeIcons],
			control: {
				type: 'check',
			}
		}
	}
};
export default meta;
type Story = StoryObj<IncidentIconComponent>;

export const Primary: Story = {
	args: {
		names: ['taxi'],
		tooltips: ['Taxi Icon'],
	},
};
