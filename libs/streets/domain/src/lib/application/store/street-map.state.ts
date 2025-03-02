import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { SetHoveredStreetId, AddToStreetCache } from './street-map.actions';

export interface StreetMapStateModel {
	streetGrid: GeoJSON<any, Geometry>[];
	hoveredStreetId?: number;
}

@State<StreetMapStateModel>({
	name: 'street_map',
	defaults: {
		streetGrid: []
	}
})
@Injectable()
export class StreetMapState {
	protected static CACHE_LIMIT = 50_000;

	@Selector()
	static getStreetCache(state: StreetMapStateModel) {
		return state.streetGrid;
	}

	@Selector()
	static getHoveredStreetId(state: StreetMapStateModel): number | undefined {
		return state.hoveredStreetId;
	}

	@Action(AddToStreetCache)
	addToStreetCache(ctx: StateContext<StreetMapStateModel>, action: AddToStreetCache) {
		// const state = ctx.getState();
		//let newCache = uniq(concat(state.streets, action.batch))
		const newCache = action.batch;

		// while(newCache.length > StreetMapState.CACHE_LIMIT) {
		// 	newCache = newCache.slice(newCache.length - StreetMapState.CACHE_LIMIT);
		// }

		ctx.patchState({
			streetGrid: newCache
		})
	}

	@Action(SetHoveredStreetId)
	setHoveredStreetId(ctx: StateContext<StreetMapStateModel>, action: SetHoveredStreetId) {
		ctx.patchState({
			hoveredStreetId: action.hoveredStreetId
		});
	}
}
