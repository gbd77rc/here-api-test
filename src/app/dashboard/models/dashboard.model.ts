import { DashboardWidget } from './dashboard-widget.model';

export interface Dashboard {
    dashboardId: string;
    dashboardName: string;
    isPublic: boolean;
    ownerId: string;
    widgets: DashboardWidget[];
}