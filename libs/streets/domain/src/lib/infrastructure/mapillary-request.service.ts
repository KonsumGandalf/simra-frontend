import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'lodash';
import { map, Observable } from 'rxjs';
import { INearestImageResponse } from '../models/interfaces/nearest-image-response.interface';

/**
 * This service is responsible for making requests to the Mapillary API
 */
@Injectable({
  providedIn: 'root'
})
export class MapillaryRequestService {
    private readonly _httpClient = inject(HttpClient);

    public getIdOfNearestImage(lat: number, lng: number): Observable<number> {
		const threshold = 0.0001;

		const minLat = +lat - threshold;
		const maxLat = +lat + threshold;
		const minLng = +lng - threshold;
		const maxLng = +lng + threshold;

        const queryParams = {
			fields: 'id',
			limit: 1,
			bbox: `${minLng},${minLat},${maxLng},${maxLat}`,
		}

        return this._httpClient.get<INearestImageResponse>(`/mapillary/images`, { params: queryParams }).pipe(
			map((response) => first(response.data).id)
		);
    }
}
