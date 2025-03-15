import { IRegion } from './region.interface';

export interface ISimraRegion extends IRegion {
	regions: IRegion[];
}
