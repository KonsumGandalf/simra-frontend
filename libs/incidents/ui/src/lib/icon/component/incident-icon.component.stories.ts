import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { INCIDENT_TYPE_TO_ICON } from '../../models/maps/incident-type-to-icon';
import { PARTICIPANT_TO_ICON } from '../../models/maps/participant-to-icon';
import { PHONE_LOCATION_TO_ICON } from '../../models/maps/phone-location-to-icon';
import { IncidentIconComponent } from './incident-icon.component';

const allParticipantIcons = Object.values(PARTICIPANT_TO_ICON).map(icon => icon.name);
const allPhoneLocationIcons = Object.values(PHONE_LOCATION_TO_ICON).map(icon => icon.name);
const allIncidentTypeIcons = Object.values(INCIDENT_TYPE_TO_ICON).map(icon => icon.svgPath);

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
			options: [...allParticipantIcons, ...allPhoneLocationIcons],
			control: {
				type: 'check',
			}
		},
		svgPath: {
			options: allIncidentTypeIcons,
			control: {
				type: 'select',
			}
		},
		tooltips: {
			table: {
				disable: true
			}
		},
		tooltipPrefix: {
			table: {
				disable: true
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

export const SvgExample: Story = {
	args: {
		svgPath: 'assets/icons/incidents/ui/tailgating.svg',
		tooltips: ['Svg Icon'],
	},
}
