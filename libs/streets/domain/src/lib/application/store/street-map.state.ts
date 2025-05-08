import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IEnrichedStreet, IStreetGrid } from '@simra/streets-common';
import { FeatureCollection, Geometry } from 'geojson';
import { SetEnrichedStreets, SetStreets, SetStreetCollection, SetStreetSafetyMetrics } from './street-map.actions';

export interface StreetMapStateModel {
	streetCollection: FeatureCollection<Geometry, IEnrichedStreet>;
	enrichedStreets: IEnrichedStreet[];
	streets: IStreetGrid[];
	safetyMetrics: Map<number, string>;
}

@State<StreetMapStateModel>({
	name: 'street_map',
})
@Injectable()
export class StreetMapState {

	@Selector()
	static getStreetCollection(state: StreetMapStateModel) {
		return state.streetCollection;
	}

	@Action(SetStreetCollection)
	setStreetCollection(ctx: StateContext<StreetMapStateModel>, action: SetStreetCollection) {
		ctx.patchState({
			streetCollection: action.batch
		})
	}

	@Selector()
	static getStreets(state: StreetMapStateModel) {
		return state.streets;
	}

	@Action(SetStreets)
	setStreets(ctx: StateContext<StreetMapStateModel>, action: SetStreets) {
		ctx.patchState({
			streets: action.batch
		})
	}

	@Action(SetEnrichedStreets)
	setEnrichedStreets(ctx: StateContext<StreetMapStateModel>, action: SetEnrichedStreets) {
		ctx.patchState({
			enrichedStreets: action.batch
		})
	}

	@Selector()
	static getEnrichedStreets(state: StreetMapStateModel) {
		return state.enrichedStreets;
	}

	@Selector()
	static getSafetyMetrics(state: StreetMapStateModel) {
		return state.safetyMetrics;
	}

	@Action(SetStreetSafetyMetrics)
	setSafetyMetrics(ctx: StateContext<StreetMapStateModel>, action: SetStreetSafetyMetrics) {
		ctx.patchState({
			safetyMetrics: action.batch
		})
	}
}
