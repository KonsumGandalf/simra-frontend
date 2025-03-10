import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ISafetyMetricsStreet } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { IResponseStreet } from '@simra/streets-common';
import { SetSelectedIncidents, SetSelectedSafetyMetrics, SetStreet } from './street-detail.actions';

export interface StreetDetailStateModel {
	street?: IResponseStreet;
	selectedSafetyMetric?: ISafetyMetricsStreet;
	selectedIncidents?: IIncident[];
}

@State<StreetDetailStateModel>({
	name: 'street_details'
})
@Injectable()
export class StreetDetailState {
	@Selector()
	static getStreet(state: StreetDetailStateModel): IResponseStreet | undefined {
		return state.street;
	}

	@Action(SetStreet)
	setStreet(ctx: StateContext<StreetDetailStateModel>, action: SetStreet) {
		if (action.street === ctx.getState().street) {
			return;
		}

		ctx.patchState({
			street: action.street
		});
	}

	@Selector()
	static getSelectedSafetyMetrics(state: StreetDetailStateModel): ISafetyMetricsStreet | undefined {
		return state.selectedSafetyMetric;
	}

	@Action(SetSelectedSafetyMetrics)
	setSafetyMetrics(ctx: StateContext<StreetDetailStateModel>, action: SetSelectedSafetyMetrics) {
		ctx.patchState({
			selectedSafetyMetric: action.safetyMetrics
		});
	}

	@Selector()
	static getSelectedIncidents(state: StreetDetailStateModel): IIncident[] | undefined {
		return state.selectedIncidents;
	}

	@Action(SetSelectedIncidents)
	setSelectedIncidents(ctx: StateContext<StreetDetailStateModel>, action: SetSelectedIncidents) {
		ctx.patchState({
			selectedIncidents: action.incidents
		});
	}
}
