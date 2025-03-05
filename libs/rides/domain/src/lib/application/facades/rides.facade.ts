import { inject, Injectable } from '@angular/core';
import { IIncident } from '@simra/incidents-models';
import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { Observable } from 'rxjs';
import { IncidentRequestService } from '@simra/incidents-domain';
import { RidesRequestService } from '../../infrastructure/rides-request.service';

@Injectable({
  providedIn: 'root'
})
export class RidesFacade {
  private readonly _ridesRequestService = inject(RidesRequestService);
    private readonly _incidentRepository = inject(IncidentRequestService);

    public getRideGeometries(id: number): Observable<RidesGeometriesInterface> {
        return this._ridesRequestService.getRideGeometries(id);
    }

    public getIncidentDetails(id: number): Observable<IIncident> {
        return this._incidentRepository.getIncidentDetails(id);
    }
}
