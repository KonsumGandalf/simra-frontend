import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IIncident } from '@simra/incidents-models';
import { MarkerContentComponent } from '../marker-content/component/marker-content.component';
import * as maplibregl from 'maplibre-gl';
import { firstValueFrom, Observable } from 'rxjs';

export async function createIncidentMarker(
	incidentData: Partial<IIncident>,
	injector: Injector,
	appRef: ApplicationRef,
	fetchIncident?: (id: number) => Observable<IIncident>,
	mlMap?: maplibregl.Map,
) {
	const container = document.createElement('div');

	const factory = injector.get(ComponentFactoryResolver).resolveComponentFactory(MarkerContentComponent);
	const componentRef = factory.create(injector);
	const incident = fetchIncident
		? await firstValueFrom(fetchIncident(incidentData.id))
		: (incidentData as IIncident);
	componentRef.instance.incident = incident;
	appRef.attachView(componentRef.hostView);

	container.appendChild((componentRef.hostView as any).rootNodes[0]);

	const popup = new maplibregl.Popup({
		offset: 15,
		className: 'incident-popup',
	})
		.setLngLat([incident.lng, incident.lat])
		.setDOMContent(container)
		.addTo(mlMap);

	popup.on('close', () => {
		appRef.detachView(componentRef.hostView);
		componentRef.destroy();
	});
}
