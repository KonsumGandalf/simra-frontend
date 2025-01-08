import { inject, Injectable } from '@angular/core';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { map, Subject } from 'rxjs';
import { EDangerousColors, MapPositionInterface } from '@simra/common-models';
import { StreetRepository } from '../../infrastructure/street.repository';
import { StreetInformationDto } from '../../models/dtos/street-information.dto';
import * as L from 'leaflet';

@Injectable({ providedIn: 'root' })
export class StreetsExploringMapFacade {
	private readonly _streetRepository = inject(StreetRepository);
	//private readonly _streetMap = new BehaviorSubject<Map<number, LineStringDto>>(new Map());
	private readonly _streetCache = new Subject<GeoJSON<any, Geometry>[]>();

	public getStreetInformation(requestParams: MapPositionInterface): Subject<GeoJSON<any, Geometry>[]> {
		this._streetRepository.getStreetInformation(requestParams).pipe(
			map((response: StreetInformationDto[]) => {

				const updatedCache: GeoJSON<any, Geometry>[] = [];
				for (const streetInformation of response) {
					if (streetInformation.dangerousColor == EDangerousColors.NEUTRAL_200) {
						continue;
					}

					updatedCache.push(L.geoJSON(JSON.parse(`${streetInformation.way}`), {
						style: {
							color: streetInformation.dangerousColor,
							weight: 2.5,
						},
					}));
				}

				this._streetCache.next(updatedCache);
			}),
		).subscribe();

		return this._streetCache;
	}


}
