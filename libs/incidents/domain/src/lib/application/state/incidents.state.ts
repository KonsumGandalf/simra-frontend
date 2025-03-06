import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IIncidentMapState } from '../../models/interfaces/incident-map-state.interface';
import { SetIncidentMarker } from './incidents.actions';

@State<IIncidentMapState>({
	name: 'incidents',
	defaults: {
		incidentMarker: [],
	},
})
export class IncidentsState {
	@Selector()
	static getIncidentMarkers(state: IIncidentMapState) {
		return state.incidentMarker;
	}

	@Action(SetIncidentMarker)
	setIncidentMarker(ctx: StateContext<IIncidentMapState>, action: SetIncidentMarker) {
		ctx.patchState({ incidentMarker: action.incidents });
	}
}
