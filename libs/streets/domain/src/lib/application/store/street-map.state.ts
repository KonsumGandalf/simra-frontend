import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { AddToStreetCache } from './street-map.actions';

export interface StreetMapStateModel {
	streetGrid: GeoJSON<any, Geometry>[];
}

@State<StreetMapStateModel>({
	name: 'street_map',
	defaults: {
		streetGrid: []
	}
})
@Injectable()
export class StreetMapState {

	@Selector()
	static getStreetCache(state: StreetMapStateModel) {
		return state.streetGrid;
	}

	@Action(AddToStreetCache)
	addToStreetCache(ctx: StateContext<StreetMapStateModel>, action: AddToStreetCache) {
		ctx.patchState({
			streetGrid: action.batch
		})
	}

}
