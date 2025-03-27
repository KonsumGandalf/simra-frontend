import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMethodRun } from '@simra/common-models';
import { map, Observable } from 'rxjs';

@Injectable({
	  providedIn: 'root'
})
export class MethodRunService {
	private _http = inject(HttpClient);

	public getLastMethodRun(methodName: string) {
		return this._http.get<IMethodRun | undefined>(`/api/method-run/${methodName}`);
	}

	public getDateOfLastMethodRun(methodName: string): Observable<Date | undefined> {
		return this.getLastMethodRun(methodName).pipe(
			map((methodRun) => {
				return methodRun?.createdDate;
			})
		);
	}
}
