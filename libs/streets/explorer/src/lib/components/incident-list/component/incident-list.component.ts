import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import {
	StatusIconDirective,
	TRAFFIC_TIMES_TO_TRANSLATION,
	WEEK_DAYS_TO_TRANSLATION,
} from '@simra/common-components';
import { Column } from '@simra/common-models';
import { scrollToElementId } from '@simra/helpers';
import { EParticipants, IIncident } from '@simra/incidents-models';
import { BIKE_TYPE_TO_TRANSLATION, INCIDENT_TYPE_TO_ICON, PARTICIPANT_TO_ICON, PHONE_LOCATION_TO_ICON } from '@simra/incidents-ui';
import { StreetDetailState } from '@simra/streets-domain';
import { times } from 'lodash';
import { PrimeTemplate } from 'primeng/api';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { HIGHWAY_TYPES_TO_TRANSLATION } from '../../../translations/maps/highway-types-to-translation';

@Component({
	selector: 'm-incident-list',
	imports: [
		CommonModule,
		Card,
		PrimeTemplate,
		Skeleton,
		TableModule,
		TranslatePipe,
		StatusIconDirective,
	],
	templateUrl: './incident-list.component.html',
	styleUrl: './incident-list.component.scss',
	host: {
		class: 'm-incident-list',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentListComponent {
	private readonly _store = inject(Store);
	private readonly _router = inject(Router);
	private readonly _translateService = inject(TranslateService);
	protected readonly _viewportScroller = inject(ViewportScroller);

	private readonly _street$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly _loading$ = computed(() => {
		const street = this._street$();
		return !street || !street.way;
	});
	protected readonly _incidents$ = this._store.selectSignal(StreetDetailState.getSelectedIncidents);

	getTranslatedParticipants(participants: EParticipants[]) {
		return participants.map((participant) => this._translateService.instant(PARTICIPANT_TO_ICON[participant]?.tooltip)).join(',');
	}

	private readonly _incidentHeaderPrefix = 'INCIDENTS.UI.GENERAL.LABELS';
	protected readonly _cols: Column[] = [
		{ header: `${this._incidentHeaderPrefix}.TIMESTAMP`, field: 'timeStamp' },
		{ header: `COMPONENTS.GENERAL.TABLE.HEADER.COLUMNS.OSM_ID`, field: 'id' },
		{ header: `${this._incidentHeaderPrefix}.INCIDENT_TYPE`, field: 'incidentType' },
		{ header: `${this._incidentHeaderPrefix}.IS_SCARY`, field: 'scary' },
		{ header: `${this._incidentHeaderPrefix}.BIKE`, field: 'bike' },
		{ header: `${this._incidentHeaderPrefix}.PHONE_LOCATION`, field: 'phoneLocation' },
		{ header: `${this._incidentHeaderPrefix}.LOCATION`, field: 'location' },
		{ header: `${this._incidentHeaderPrefix}.PARTICIPANTS`, field: 'participantsInvolved' },
		{ header: `${this._incidentHeaderPrefix}.DESCRIPTION`, field: 'description' },
		{ header: `${this._incidentHeaderPrefix}.IS_CHILD`, field: 'childCheckBox' },
		{ header: `${this._incidentHeaderPrefix}.IS_TRAILER`, field: 'trailerCheckBox' },
	];
	zoomOnIncident(incident: IIncident) {
		this._router.navigate([], {
			queryParams: { lat: incident.lat.toFixed(5), lng: incident.lng.toFixed(5), zoom: 18 },
			queryParamsHandling: 'merge',
		});

		scrollToElementId('street-information');
	}

	protected readonly times = times;

	protected readonly BIKE_TYPE_TO_TRANSLATION = BIKE_TYPE_TO_TRANSLATION;
	protected readonly HIGHWAY_TYPES_TO_TRANSLATION = HIGHWAY_TYPES_TO_TRANSLATION;
	protected readonly WEEK_DAYS_TO_TRANSLATION = WEEK_DAYS_TO_TRANSLATION;
	protected readonly TRAFFIC_TIMES_TO_TRANSLATION = TRAFFIC_TIMES_TO_TRANSLATION;
	protected readonly INCIDENT_TYPE_TO_ICON = INCIDENT_TYPE_TO_ICON;
	protected readonly PHONE_LOCATION_TO_ICON = PHONE_LOCATION_TO_ICON;
}
