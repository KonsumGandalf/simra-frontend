import { inject, Injectable } from '@angular/core';
import { IncidentsMapFacade } from '@simra/incidents-domain';
import { StreetsMapFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';
import { BERLIN_POSITION } from '@simra/common-components';

@Injectable({
  providedIn: 'root'
})
export class PrefetchService {
  private readonly _incidentsMapFacade = inject(IncidentsMapFacade);
  private readonly _streetMapFacade = inject(StreetsMapFacade);

    public async prefetchIncidents(): Promise<void> {
        await firstValueFrom(this._incidentsMapFacade.getIncidentMarker());
    }

    public async prefetchStreetGrid(): Promise<void> {
        await this._streetMapFacade.fetchStreetInformation(BERLIN_POSITION);
    }
}
