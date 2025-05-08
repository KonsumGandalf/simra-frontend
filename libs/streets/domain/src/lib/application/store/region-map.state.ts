import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FeatureCollection, Geometry } from 'geojson';
import { IEnrichedRegion, IRegionMap } from '@simra/streets-common';
import {
	SetRegionCollection,
	SetRegions,
	SetRegionSafetyMetrics,
	SetEnrichedRegions
} from './region-map.actions';

export interface RegionMapStateModel {
	regionCollection: FeatureCollection<Geometry, IEnrichedRegion> | null;
	regionMap: IRegionMap[];
	regionSafetyMetrics: Map<number, string>;
	enrichedRegionMap: IEnrichedRegion[];
}

@State<RegionMapStateModel>({
	name: 'region_map',
})
@Injectable()
export class RegionMapState {

	@Selector()
	static getRegionCollection(state: RegionMapStateModel) {
		return state.regionCollection;
	}

	@Selector()
	static getRegionMap(state: RegionMapStateModel) {
		return state.regionMap;
	}

	@Selector()
	static getEnrichedRegionMap(state: RegionMapStateModel) {
		return state.enrichedRegionMap;
	}

	@Selector()
	static getSafetyMetrics(state: RegionMapStateModel) {
		return state.regionSafetyMetrics;
	}

	@Action(SetRegionCollection)
	setRegionCollection(ctx: StateContext<RegionMapStateModel>, action: SetRegionCollection) {
		ctx.patchState({ regionCollection: action.batch });
	}

	@Action(SetRegions)
	setRegions(ctx: StateContext<RegionMapStateModel>, action: SetRegions) {
		ctx.patchState({ regionMap: action.batch });
	}

	@Action(SetEnrichedRegions)
	setEnrichedRegions(ctx: StateContext<RegionMapStateModel>, action: SetEnrichedRegions) {
		ctx.patchState({ enrichedRegionMap: action.batch });
	}

	@Action(SetRegionSafetyMetrics)
	setRegionSafetyMetrics(ctx: StateContext<RegionMapStateModel>, action: SetRegionSafetyMetrics) {
		ctx.patchState({ regionSafetyMetrics: action.batch });
	}
}
