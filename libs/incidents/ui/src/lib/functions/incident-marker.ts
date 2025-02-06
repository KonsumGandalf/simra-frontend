import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IncidentInterface } from '@simra/incidents-models';
import { LatLng, Marker } from 'leaflet';
import { firstValueFrom, Observable } from 'rxjs';
import { MarkerContentComponent } from '../marker-content/public-api';
import { createCustomMapPin } from './create-custom-map-pin';

/**
 * Creates a Leaflet marker with a popup that displays incident details
 *
 * @param incidentData Incident data (either partial or full)
 * @param injector Angular dependency injector
 * @param appRef Application reference
 * @param fetchIncident Optional function to fetch additional incident details in case the provided data is partial
 * @returns Leaflet Marker
 */
export function createIncidentMarker(
	incidentData: Partial<IncidentInterface>,
	injector: Injector,
	appRef: ApplicationRef,
	fetchIncident?: (id: number) => Observable<IncidentInterface>,
): Marker {
	const marker = new Marker(new LatLng(incidentData.lat, incidentData.lng), {
		icon: createCustomMapPin(incidentData.scary),
	});

	marker.on('click', async () => {
		marker.unbindPopup();
		const popupContainer = document.createElement('div');
		popupContainer.innerHTML = 'Loading...';

		const factory = injector.get(ComponentFactoryResolver).resolveComponentFactory(MarkerContentComponent);
		const componentRef = factory.create(injector);
		marker.bindPopup(popupContainer).openPopup();

		const incident = fetchIncident
			? await firstValueFrom(fetchIncident(incidentData.id))
			: (incidentData as IncidentInterface);

		componentRef.instance.incident = incident;
		appRef.attachView(componentRef.hostView);

		popupContainer.innerHTML = '';
		popupContainer.appendChild(componentRef.location.nativeElement);

		marker.setPopupContent(popupContainer);
	});

	return marker;
}
