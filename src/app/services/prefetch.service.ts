import { inject, Injectable } from '@angular/core';
import { IMapPosition } from '@simra/common-models';
import { IncidentsMapFacade } from '@simra/incidents-domain';
import { StreetsMapFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefetchService {
  private readonly _incidentsMapFacade = inject(IncidentsMapFacade);
  private readonly _streetMapFacade = inject(StreetsMapFacade);

    public async prefetchIncidents(): Promise<void> {
        await firstValueFrom(this._incidentsMapFacade.getIncidentMarker());
    }

    public async prefetchStreetGrid(position: IMapPosition): Promise<void> {
        await this._streetMapFacade.fetchStreetInformation(position);
    }
}
