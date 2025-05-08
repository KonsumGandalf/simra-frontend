import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
	IResponseStreet,
	ICycleway,
	IParking,
	ITags, IStreetGrid,
} from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { defaults, isEmpty, isUndefined, omitBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { StreetGridDto } from '@simra/streets-common';
import { StreetRideEntitiesResponseDto } from '../models/dtos/street-ride-entities-response.dto';
import { TRideTime } from '../models/interfaces/ride-time.type';

/**
 * Service to fetch street information for the '/api/streets' endpoint
 */
@Injectable({ providedIn: 'root' })
export class StreetsRequestService {
	private readonly _http = inject(HttpClient);

	public getStreetGrid(): Observable<IStreetGrid[]> {
		return this._http.get<IStreetGrid[]>('/assets/maplibre/street-map.json').pipe(
			map((response) => {
				return plainToInstance(StreetGridDto, response);
			}),
		);
	}

	public getStreetNames(prefix: string): Observable<string[]> {
		return this._http.get<string[]>(`/api/streets/name/${prefix}`);
	}

	public getStreetIds(prefix: string): Observable<string[]> {
		return this._http.get<string[]>(`/api/streets/id/${prefix}`);
	}

	public getStreet(streetId: number): Observable<IResponseStreet> {
		return this._http.get<IResponseStreet>(`/api/streets/${streetId}`).pipe(
			map((response)=> {
				return defaults({
					tags: this._processTags(response.tags),
				}, response);
			}),
		);
	}

	public getStreetRideEntities(streetId: number, requestParams: TRideTime): Observable<TRideTime[]> {
		const params = {
			...requestParams,
			rideStart: requestParams.rideStart.toISOString(),
			rideEnd: requestParams.rideEnd.toISOString(),
		}
		return this._http
			.get<StreetRideEntitiesResponseDto>(`/api/streets/${streetId}/ride-entities`, { params })
			.pipe(
				map((response) => {
					return plainToInstance(StreetRideEntitiesResponseDto, response).rides
				}),
			);
	}

	private _processTags(tags: unknown): ITags {
		const constructedTags: ITags = {};
		constructedTags.maxSpeed = (tags['maxspeed']) ? parseInt(tags['maxspeed']) : undefined;
		constructedTags.lanes = (tags['lanes']) ? parseInt(tags['lanes']) : undefined;
		constructedTags.lit = (tags['lit'] && tags['lit']!="no") ? true : undefined;

		const bothCycleway = this._processCycleway(tags, 'both');
		const cyclewayLeft = defaults(this._processCycleway(tags, 'left'), bothCycleway);
		if (!isEmpty(cyclewayLeft)) constructedTags.cyclewayLeft = cyclewayLeft;
		const cyclewayRight = defaults(this._processCycleway(tags, 'right'), bothCycleway);
		if (!isEmpty(cyclewayRight)) constructedTags.cyclewayRight = cyclewayRight;

		const parking = this._processParking(tags, 'both');
		const parkingRight = defaults(this._processParking(tags, 'right'), parking);
		if (!isEmpty(parkingRight)) constructedTags.parkingRight = parkingRight;
		const parkingLeft = defaults(this._processParking(tags, 'left'), parking);
		if (!isEmpty(parkingLeft)) constructedTags.parkingLeft = parkingLeft;

		return constructedTags;
	}

	private _processParking(tags: unknown, identifier: string): IParking {
		if (!tags[`parking:${identifier}`]) {
			return;
		}

		return omitBy({
			type: tags[`parking:${identifier}`]
		}, isUndefined) as IParking;
	}

	private _processCycleway(tags: unknown, identifier: string): ICycleway {
		if (!tags[`cycleway:${identifier}`]) {
			return;
		}

		return omitBy({
			type: tags[`cycleway:${identifier}:lane`] || tags[`cycleway:${identifier}`],
			width: tags[`cycleway:${identifier}:width`]
		}, isUndefined) as ICycleway;
	}
}
