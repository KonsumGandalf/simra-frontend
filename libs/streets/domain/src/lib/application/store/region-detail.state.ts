import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { SetRegionName } from './region-detail.actions';

export interface IRegionDetailState {
	name?: string;
}

@State<IRegionDetailState>({
	name: 'region_details'
})
@Injectable()
export class RegionDetailState {
	@Selector()
	static getRegionName(state: IRegionDetailState): string | undefined {
		return state.name;
	}

	@Action(SetRegionName)
	setRegion(ctx: any, action: SetRegionName): void {
		ctx.patchState({
			name: action.payload.name,
		});
	}
}
