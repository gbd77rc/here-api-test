import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.route';
import { DashboardHostComponent } from './dashboard-host/dashboard-host.component';
import { MapWidgetComponent } from './widgets/map-widget/map-widget.component';
import { LineChartWidgetComponent } from './widgets/line-chart-widget/line-chart-widget.component';

import { DonutChartWidgetComponent } from './widgets/donut-chart-widget/donut-chart-widget.component';
import { DashboardPrefDialogComponent } from './dashboard-pref-dialog/dashboard-pref-dialog.component';
import { MapSettingDialogComponent } from './widgets/map-widget/settings/map-setting-dialog.component';
import { NgxdModule } from '@ngxd/core';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const widgets = [
    MapWidgetComponent,
    LineChartWidgetComponent,
    DonutChartWidgetComponent,
];

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardHostComponent,
        DashboardPrefDialogComponent,
        MapWidgetComponent,
        LineChartWidgetComponent,
        DonutChartWidgetComponent,
        MapSettingDialogComponent,
        DashboardLayoutComponent,
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        NgxdModule,
    ],
    providers: [DashboardComponent],
    entryComponents: [...widgets],
})
export class DashboardModule {}
