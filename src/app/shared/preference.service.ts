import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { Preference } from './preference';
import { tap, catchError, map } from 'rxjs/operators';
import { Utils } from './utils';

@Injectable({
    providedIn: 'root',
})
export class PreferenceService {
    private preferenceUrl = 'api/preferences';
    private preference: Preference;
    constructor(private _httpClient: HttpClient) {}

    getPreference(section: string): Observable<Preference> {
        if (this.preference) {
            return of(this.preference);
        }
        return this._httpClient.get<Preference>(this.preferenceUrl).pipe(
            tap((data) => console.log(JSON.stringify(data))),
            tap((data) => (this.preference = data[0])),
            map((data) => data[0]),
            catchError(Utils.handleError)
        );
    }

    savePreference(preference: Preference): Observable<Preference> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.preferenceUrl}/${preference.preferenceId}`;
        return this._httpClient
            .put<Preference>(url, preference, { headers })
            .pipe(
                tap(() =>
                    console.log('updatePreference: ' + preference.preferenceId)
                ),
                // Return the product on an update
                map(() => preference),
                catchError(Utils.handleError)
            );
    }
}
