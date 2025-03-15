import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISimraRegion } from '@simra/models';
import proj4 from 'proj4';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SimraRegionRequestService {
 	private readonly _httpClient = inject(HttpClient);

	public getDetailedRegion(regionName: string): Observable<ISimraRegion> {
		return this._httpClient.get<ISimraRegion>(`/api/simra-regions/${regionName}`).pipe(
			map((region) => {
				const convertedPolygon: number[][][] = region.way.coordinates.map((ring) =>
					ring.map(([x, y]) => {
						return proj4('EPSG:3857', 'EPSG:4326', [x, y]);
					}),
				);
				return {
					...region,
					way: {
						...region.way,
						coordinates: convertedPolygon,
					},
				};
			})
		);
	}
}
