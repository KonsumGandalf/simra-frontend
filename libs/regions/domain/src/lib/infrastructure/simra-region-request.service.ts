import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISimraRegion } from '@simra/models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SimraRegionRequestService {
 	private readonly _httpClient = inject(HttpClient);

	public getDetailedRegion(regionName: string): Observable<ISimraRegion> {
		return this._httpClient.get<ISimraRegion>(`/api/simra-regions/${regionName}`);
	}
}
