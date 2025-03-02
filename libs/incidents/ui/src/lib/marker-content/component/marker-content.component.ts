import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EIncidentType, IIncident } from '@simra/incidents-models';
import { Divider } from 'primeng/divider';
import { IncidentIconComponent } from '../../icon/component/incident-icon.component';
import { BIKE_TYPE_TO_TRANSLATION } from '../../models/maps/bike-type-to-translation';
import { INCIDENT_TYPE_TO_ICON } from '../../models/maps/incident-type-to-icon';
import { PARTICIPANT_TO_ICON } from '../../models/maps/participant-to-icon';
import { PHONE_LOCATION_TO_ICON } from '../../models/maps/phone-location-to-icon';

/**
 * This component displays the content of a marker within a popup
 */
@Component({
    selector: 'm-marker-content',
    imports: [CommonModule, TranslatePipe, IncidentIconComponent, Divider],
    templateUrl: './marker-content.component.html',
    styleUrl: './marker-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'm-marker-content',
    }
})
export class MarkerContentComponent {
	private readonly _translationService = inject(TranslateService);

	/**
	 * The incident to display
	 */
	@Input({ required: true })
	public incident!: IIncident;
	protected readonly phoneLocationToIcon = PHONE_LOCATION_TO_ICON;
	protected readonly bikeTypeToTranslation = BIKE_TYPE_TO_TRANSLATION;
	protected readonly incidentTypeToIcon = INCIDENT_TYPE_TO_ICON;
	protected readonly participantToIcon = PARTICIPANT_TO_ICON;
	protected readonly EIncidentType = EIncidentType;

	@HostBinding('class.incident-icon--is-scary')
	get isSerious() {
		return this.incident.scary;
	}

	get participantsTooltips(): string[] {
		return this.incident.participantsInvolved.map((participant) => {
			const translationKey = this.participantToIcon[participant].tooltip;
			return this._translationService.instant(translationKey);
		});
	}

	get participantIconNames(): string[] {
		return this.incident.participantsInvolved.map(
			(participant) => this.participantToIcon[participant].name,
		);
	}
}
