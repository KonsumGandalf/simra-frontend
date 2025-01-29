import { ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { IncidentInterface } from '@simra/incidents-models';
import { MarkerContentComponent } from '../marker-content/public-api';
import { Marker } from 'leaflet';
import { LatLng } from 'leaflet';
import { createCustomMapPin } from './create-custom-map-pin';

export function IncidentMarker(incident: IncidentInterface, injector: Injector, appRef: ApplicationRef): Marker {

	// Create a new Leaflet marker
	const marker = new Marker(new LatLng(incident.lat, incident.lng), { icon: createCustomMapPin(incident.scary) });

	// Dynamically create and insert the component into the Leaflet popup
	const factory = injector.get(ComponentFactoryResolver).resolveComponentFactory(MarkerContentComponent);
	const componentRef = factory.create(injector);

	// Pass any required data (e.g., `incident`) to the component
	componentRef.instance.incident = incident; // Assuming `incident` is a property of MarkerContentComponent

	// Attach the component to the Angular application view
	appRef.attachView(componentRef.hostView);

	// Directly set the component's DOM element as the popup content for the marker
	marker.bindPopup(componentRef.location.nativeElement);

	return marker;
}
