import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MapFilterOptionsInterface } from '@simra/common-models';
import { UpdateFilterOptions } from '../actions/map-filter.actions';

@State<MapFilterOptionsInterface>({
	name: 'map_filter',
	defaults: {
		weekDay: undefined,
		year: undefined,
		trafficTime: undefined,
	}
})
@Injectable()
export class MapFilterState {
	@Selector()
	static getMapFilterState(state: MapFilterOptionsInterface) {
		return state;
	}

	@Action(UpdateFilterOptions)
	addToStreetCache(ctx: StateContext<MapFilterOptionsInterface>, action: UpdateFilterOptions) {
		ctx.patchState({
			...action.filterOptions
		});
	}
}
