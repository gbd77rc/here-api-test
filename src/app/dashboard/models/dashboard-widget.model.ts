import { GridsterItem } from 'angular-gridster2';

export interface DashboardWidget extends GridsterItem{
    componentRef: string;
    dataConfig:any;
    name: string;
}