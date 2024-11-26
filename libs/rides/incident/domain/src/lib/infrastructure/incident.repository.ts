import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable, tap } from 'rxjs';
import { RideManualDescriptionInterface } from '@simra/rides-common-models';
import { RidesManualDescriptionResponseDto } from '../models/dtos/rides-manual-description-response.dto';

@Injectable({ providedIn: 'root' })
export class IncidentRepository {
  private readonly _http = inject(HttpClient);

  public getincidents(): Observable<RideManualDescriptionInterface[]> {
    const params = new HttpParams().set('size', '200');

    return this._http.get('/api/jpa/rideManualDescriptions', { params }).pipe(
      tap((reponse) => console.log(reponse)),
      map(
        (response) =>
          plainToInstance(RidesManualDescriptionResponseDto, response)._embedded
            .rideManualDescriptions
      )
    );
  }
}
