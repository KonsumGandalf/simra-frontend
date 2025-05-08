import { inject, Injectable } from '@angular/core';
import { MapFilterOptionsInterface } from '@simra/common-models';
import { IncidentsMapFacade } from '@simra/incidents-domain';
import { IGetStreetGrid } from '@simra/streets-common';
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

    public prefetchStreetGrid(position: MapFilterOptionsInterface): void {
        this._streetMapFacade.fetchStreetGrid();
        this._streetMapFacade.updateMap(position);
    }
}
