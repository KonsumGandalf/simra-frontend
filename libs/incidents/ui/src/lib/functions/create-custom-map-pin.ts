import { divIcon, DivIcon } from 'leaflet';

export function createCustomMapPin(isScary: boolean): DivIcon {
	const color = isScary ? 'text-red-500' : 'text-blue-500'; // Dynamic color

	const className = `ph-fill ph-map-pin-simple text-4xl bg-transparent ${color}`; // Dynamic color
	return divIcon({
		className: className,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32]
	});
}
