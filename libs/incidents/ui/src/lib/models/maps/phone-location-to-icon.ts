import { EPhoneLocations } from '@simra/incidents-models';
import { IconTooltipInterface } from '../../icon/models/icon-tooltip.interface';

export const PHONE_LOCATION_TO_ICON: Record<EPhoneLocations, IconTooltipInterface> = {
	[EPhoneLocations.POCKET]: { name: 'pants', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.POCKET' },
	[EPhoneLocations.HANDLEBAR]: { name: 'align-center-vertical-simple', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.HANDLEBAR' },
	[EPhoneLocations.JACKET_POCKET]: { name: 'hoodie', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.JACKET_POCKET' },
	[EPhoneLocations.HAND]: { name: 'hand-deposit', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.HAND' },
	[EPhoneLocations.BASKET_PANNIER]: { name: 'basket', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.BASKET_PANNIER' },
	[EPhoneLocations.BACKPACK_BAG]: { name: 'backpack', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.BACKPACK_BAG' },
	[EPhoneLocations.OTHER]: { name: 'question', tooltip: 'INCIDENTS.UI.PHONE_LOCATIONS.OTHER' },
};
