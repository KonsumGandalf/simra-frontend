import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProfileGroupAssociation } from '@simra/models';
import { map } from 'rxjs';

@Injectable({
	  providedIn: 'root'
})
export class GroupAssociationRequestService {
	private readonly _httpClient = inject(HttpClient);

	public getGroupAssociation(simraRegion: string) {
		return this._httpClient.get<IProfileGroupAssociation[]>(`/api/group-association/${simraRegion}`).pipe(
			map((groupAssociation) => {
				console.log(simraRegion);
				return groupAssociation.filter((group) => group.groupValue);
			})
		);
	}
}
