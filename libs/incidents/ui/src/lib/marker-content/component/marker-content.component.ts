import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EIncidentType, IncidentInterface } from '@simra/incidents-models';
import { Divider } from 'primeng/divider';
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
	imports: [CommonModule, TranslatePipe, IncidentIconComponent, Divider],
	templateUrl: './marker-content.component.html',
	styleUrl: './marker-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'm-marker-content',
	},
})
export class MarkerContentComponent {
	private readonly _translationService = inject(TranslateService);

	/**
	 * The incident to display
	 */
	@Input({ required: true })
	public incident!: IncidentInterface;
	protected readonly phoneLocationToIcon = phoneLocationToIcon;
	protected readonly bikeTypeToTranslation = bikeTypeToTranslation;
	protected readonly incidentTypeToIcon = incidentTypeToIcon;
	protected readonly participantToIcon = participantToIcon;
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
