import { StorybookTranslateModule } from '@simra/helpers';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '@simra/incidents-models';
import { MarkerContentComponent } from './marker-content.component';
import { faker } from '@faker-js/faker';


const meta: Meta<MarkerContentComponent> = {
	component: MarkerContentComponent,
	title: 'MarkerContentComponent',
	decorators: [
		moduleMetadata({
			imports: [StorybookTranslateModule],
		}),
	]
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
	args: {
		incident: {
			// will not be displayed in the story
			lat: 13,
			lng: 42,
			id: 1,
			incidentType: EIncidentType.CLOSE_PASS,
			bike: EBikeType.MOUNTAIN_BIKE,
			description: faker.lorem.paragraph(3),
			participantsInvolved: [EParticipants.BUS_COACH, EParticipants.CAR, EParticipants.LORRY_TRUCK],
			phoneLocation: EPhoneLocations.BACKPACK_BAG,
			scary: true,
			timeStamp: new Date(),
		}
	}
};
