import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { Subscription } from "rxjs";
import { Dashboard } from "../models/dashboard.model";
import { Widget } from "../models/widget.model";
import { MediaMatcher } from "@angular/cdk/layout";
import { PreferenceService } from 'src/app/shared/preference.service';
import { Preference } from 'src/app/shared/preference';
import { GridType, DisplayGrid } from 'angular-gridster2';
import { MatDialog } from '@angular/material/dialog';
import { DashboardPrefDialogComponent } from '../dashboard-pref-dialog/dashboard-pref-dialog.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { Utils } from 'src/app/shared/utils';

@Component({
    templateUrl: "./dashboard-host.component.html",
    styleUrls: ["./dashboard-host.component.css"],
})
export class DashboardHostComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    protected subscription: Subscription;

    dashboards: Dashboard[];
    selectedDashboard: Dashboard;
    widgets: Widget[];

    needsSaving: boolean = false;

    ownerPreference: Preference;

    constructor(
        private _service: DashboardService,
        private _prefService: PreferenceService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private _dialog: MatDialog,
        private _notify: NotificationService
    ) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    openDialog() {
        const dialogRef = this._dialog.open(DashboardPrefDialogComponent, {
            data: this.ownerPreference
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this._prefService.savePreference(result)
                .subscribe({
                    next: (preference: Preference) => {
                        this.ownerPreference = preference;
                        this._notify.showSuccess("Save Preferences", `Successfully saved Dashboard preferences.`);
                    },
                    error: (error) => {
                        const msg = Utils.formatError(error)
                        this._notify.showWarning("Save Settings", msg);
                    },
                })
            }
        });
      }

    ngOnInit(): void {
        this._service
            .getWidgets()
            .subscribe((widgets) => (this.widgets = widgets));
        this.subscribe();
        this._prefService.getPreference("dashboard")
        .subscribe((preference:Preference)=>{
            // Check if we need to use the defaults
            if (preference.preferenceId === ""){
                preference.values.push({
                    name: "gridType",
                    value:GridType.Fixed.toString()
                }, {
                    name: "displayGrid",
                    value: DisplayGrid.Always.toString()
                }, {
                    name: "maxCols",
                    value: 15
                }, {
                    name: "maxRows",
                    value: 10
                })
            }
            this.ownerPreference = preference;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    protected subscribe(): void {
        this.subscription = this._service
            .getDashboards(true, true)
            .subscribe((data) => {
                this.dashboards = data;
                const avatar = {
                    defaultDashboardId: "a1063851-f7fb-4066-afef-9a85cde08c6d"
                }
                if (avatar.defaultDashboardId) {
                    for (const dash of this.dashboards) {
                        if (dash.dashboardId === avatar.defaultDashboardId) {
                            this.selectedDashboard = dash;
                        }
                    }
                }
                if (!this.selectedDashboard) {
                    this.selectedDashboard = this.dashboards[0];
                }
            });
    }

    protected unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onMenuClick(item: Dashboard) {
        this.selectedDashboard = item;
    }

    dragStartHandler(ev: DragEvent, widget: Widget): void {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData("widget", JSON.stringify(widget));
            //ev.dataTransfer.clearData("DragImage");
            ev.dataTransfer.dropEffect = "move";
            // const dragIcon = new Image();
            // dragIcon.src = "/assets/widget.png";

            // ev.dataTransfer.setDragImage(dragIcon, 16,16);
        }
    }

    onDashboardCanSave(value: boolean): void{
        this.needsSaving = value;
    }

    saveDashboard(){
        this._service.saveDashboard(this.selectedDashboard)
        .subscribe({
            next: (dashboard: Dashboard) => {
                this.selectedDashboard.dashboardId = dashboard.dashboardId;
                this.selectedDashboard.ownerId = dashboard.ownerId;
                this.selectedDashboard.isPublic = dashboard.isPublic;
                this._notify.showSuccess("Save Dashboard", `Successfully saved Dashboard.`);
                this.needsSaving = false;
            },
            error: (error) => {
                const msg = Utils.formatError(error)
                this._notify.showWarning("Save Dashboard", msg);
            },
        });
    }
}
