import { inject, Injectable } from '@angular/core';
import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { Observable } from 'rxjs';
import { RidesRequestService } from '../../infrastructure/rides-request.service';

@Injectable({
  providedIn: 'root'
})
export class RidesExploringFacade {
  private readonly _ridesRequestService = inject(RidesRequestService);

    public getRideGeometries(id: number): Observable<RidesGeometriesInterface> {
        return this._ridesRequestService.getRideGeometries(id);
    }
}
