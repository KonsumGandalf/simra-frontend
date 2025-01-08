import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetStreetInformationInterface } from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { StreetInformationDto } from '../models/dtos/street-information.dto';

@Injectable({ providedIn: 'root' })
export class StreetRepository {
	private readonly _http = inject(HttpClient);

	public getStreetInformation(requestParams: GetStreetInformationInterface): Observable<StreetInformationDto[]> {
		return this._http.get<StreetInformationDto[]>('/api/streets', { params: { ...requestParams } }).pipe(
			map((response) => plainToInstance(StreetInformationDto, response)),
		);

	}
}
