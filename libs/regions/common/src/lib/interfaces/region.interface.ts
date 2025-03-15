import { IWayPolygon } from '@simra/streets-common';

export interface IRegion {
	name: string;
	id: number;
	avgSegmentDistance: number;
	way: IWayPolygon;
}
