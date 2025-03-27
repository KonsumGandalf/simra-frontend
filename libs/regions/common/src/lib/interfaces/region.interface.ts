import { IWayPolygon } from '@simra/streets-common';

export interface IRegion {
	name: string;
	id: number;
	way: IWayPolygon;
}
