import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IResponseStreet, ISafetyMetrics } from '@simra/streets-common';
import { SetSelectedSafetyMetrics, SetStreet } from './street-detail.actions';

export interface StreetDetailStateModel {
	street?: IResponseStreet;
	selectedSafetyMetric?: ISafetyMetrics;
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
	static getSelectedSafetyMetrics(state: StreetDetailStateModel): ISafetyMetrics | undefined {
		return state.selectedSafetyMetric;
	}

	@Action(SetSelectedSafetyMetrics)
	setSafetyMetrics(ctx: StateContext<StreetDetailStateModel>, action: SetSelectedSafetyMetrics) {
		ctx.patchState({
			selectedSafetyMetric: action.safetyMetrics
		});
	}
}
