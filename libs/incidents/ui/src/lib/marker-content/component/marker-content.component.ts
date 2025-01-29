import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EIncidentType, EParticipants, IncidentInterface } from '@simra/incidents-models';
import { IncidentIconComponent } from '../../icon/component/incident-icon.component';
import { bikeTypeToTranslation } from '../../models/maps/bike-type-to-translation';
import { incidentTypeToIcon } from '../../models/maps/incident-type-to-icon';
import { participantToIcon } from '../../models/maps/participant-to-icon';
import { phoneLocationToIcon } from '../../models/maps/phone-location-to-icon';

/**
 * This component displays the content of a marker within a popup
 */
@Component({
	selector: 'm-marker-content',
	standalone: true,
	imports: [CommonModule, TranslatePipe, IncidentIconComponent],
	templateUrl: './marker-content.component.html',
	styleUrl: './marker-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'm-marker-content',
	},
})
export class MarkerContentComponent {
	/**
	 * The incident to display
	 */
	@Input({ required: true })
	public incident!: IncidentInterface;
	protected readonly phoneLocationToIcon = phoneLocationToIcon;
	protected readonly bikeTypeToTranslation = bikeTypeToTranslation;
	protected readonly incidentTypeToIcon = incidentTypeToIcon;
	protected readonly participantToIcon = participantToIcon;
	protected readonly EParticipants = EParticipants;

	@HostBinding('class.incident-icon--is-scary')
	get isSerious() {
		return this.incident.scary;
	}

	protected readonly EIncidentType = EIncidentType;
}
