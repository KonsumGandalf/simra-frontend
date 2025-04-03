import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegion } from '@simra/models';

@Injectable({
	providedIn: 'root'
})
export class RegionRequestService {
 	private readonly _httpClient = inject(HttpClient);

	public getDetailedRegion(regionName: string) {
		return this._httpClient.get<IRegion>(`/api/regions/${regionName}`);
	}
}
