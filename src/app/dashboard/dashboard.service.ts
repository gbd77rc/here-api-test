import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Dashboard } from './models/dashboard.model';
import { BehaviorSubject, Observable, of, from, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Widget } from './models/widget.model';
import { Utils } from '../shared/utils';

@Injectable({
    providedIn: "root",
})
export class DashboardService {
    private widgetsUrl  = "api/widgets";
    private widgets: Widget[];
    private dashboardsUrl = "api/dashboards";
    private dashboards: Dashboard[];
    private selectedDashboardSource = new BehaviorSubject<Dashboard|null>(null);
    // Convention $ postfix mean observable
    selectDashboardChanges$ = this.selectedDashboardSource.asObservable();
    changeDashboardSetting(selected: Dashboard | null):void {
        this.selectedDashboardSource.next(selected);
    }

    constructor(
        private _httpClient: HttpClient,
    ) {}

    getWidgets(): Observable<Widget[]> {
        if (this.widgets) {
            return of(this.widgets);
        }
        return this._httpClient.get<Widget[]>(this.widgetsUrl).pipe(
            tap((data) => console.log(JSON.stringify(data))),
            tap((data) => this.widgets = data),
            catchError(Utils.handleError)
        );
    }


    getDashboards(includePublic: boolean, includeOwn: boolean): Observable<Dashboard[]> {
        if (this.dashboards) {
            return of(this.dashboards);
        }
        return this._httpClient.get<Dashboard[]>(this.dashboardsUrl).pipe(
            tap((data) => console.log(JSON.stringify(data))),
            tap((data) => this.dashboards = data),
            catchError(Utils.handleError)
        );
    }

    getDashboard(dashboardId:string): Observable<Dashboard> {
        if (this.dashboards) {
            const foundItem = this.dashboards.find(item => item.dashboardId == dashboardId);
            if (foundItem){
                return of(foundItem);
            }
        }
        const url = `${this.dashboardsUrl}/${dashboardId}`;
        return this._httpClient.get<Dashboard>(url).pipe(
            tap((data) => console.log("getProduct: " + JSON.stringify(data))),
            catchError(Utils.handleError)
        );
    }

    saveDashboard(dashboard: Dashboard): Observable<Dashboard>{
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const url = `${this.dashboardsUrl}/${dashboard.dashboardId}`;
        return this._httpClient
            .put<Dashboard>(url, dashboard, { headers })
            .pipe(
                tap(() => console.log("updateDashboard: " + dashboard.dashboardId)),
                // Return the product on an update
                map(() => dashboard),
                catchError(Utils.handleError)
            );
    }
}
