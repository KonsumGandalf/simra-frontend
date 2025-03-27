import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
	  providedIn: 'root'
})
export class RegionRequestService {
	private readonly _httpClient = inject(HttpClient);

	public fetchRegionNames(prefix: string) {
		return this._httpClient.get<string[]>(`/api/regions/name${prefix ? `/${prefix}` : ''}`);
	}
}
