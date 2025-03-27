import {
	BERLIN_POSITION,
	HANNOVER_POSITION,
	HEIDELBERG_POSITION, MUNICH_POSITION,
	NUREMBERG_POSITION,
	RUHRGEBIET_POSITION,
	WALLDORF_POSITION, WUPPERTAL_POSITION,
} from '@simra/common-components';
import { ICityLink } from './city-link.interface';

export const CITY_POSITION_LINKS: ICityLink[] = [
		{
			label: 'Berlin',
			position: BERLIN_POSITION
		},
		{
			label: 'Nürnberg',
			position: NUREMBERG_POSITION
		},
		{
			label: 'Hannover',
			position: HANNOVER_POSITION
		},
		{
			label: 'Walldorf',
			position: WALLDORF_POSITION
		},
		{
			label: 'Heidelberg',
			position: HEIDELBERG_POSITION
		},
		{
			label: 'Ruhrgebiet',
			position: RUHRGEBIET_POSITION
		},
		{
			label: 'Wuppertal',
			position: WUPPERTAL_POSITION
		},
		{
			label: 'Munich',
			position: MUNICH_POSITION
		},
	]
