import { divIcon, DivIcon } from 'leaflet';

export function createCustomMapPin(isScary: boolean): DivIcon {
	const svgUrl = `assets/icons/incidents/ui/pin-${isScary ? 'red': 'blue'}.svg`;

	const className = `text-4xl`;
	return divIcon({
		className: className,
		html: `<img src="${svgUrl}" class="w-8 h-8" />`,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32]
	});
}
