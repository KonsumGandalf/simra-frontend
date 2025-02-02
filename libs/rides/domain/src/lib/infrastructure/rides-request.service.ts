import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { RidesGeometriesResponseDto } from '../models/dtos/rides-geometries-response.dto';

@Injectable({
  providedIn: 'root'
})
export class RidesRequestService {
  private readonly _http = inject(HttpClient);

  public getRideGeometries(id: number): Observable<RidesGeometriesInterface>{
    return this._http.get<RidesGeometriesResponseDto>(`/api/rides/geometries/${id}`).pipe(
        map((response) => plainToInstance(RidesGeometriesResponseDto, response))
    )
  }
}
