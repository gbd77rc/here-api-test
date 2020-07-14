import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardWidget } from '../models/dashboard-widget.model';

export abstract class WidgetBase {
    @Input() widget: DashboardWidget;
    @Output() onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onRemoved: EventEmitter<DashboardWidget> = new EventEmitter<DashboardWidget>();
    abstract onOpenSetting(event: MouseEvent| TouchEvent): void;

    removeItem(): void{
        event.preventDefault();
        event.stopPropagation();
        this.onRemoved.emit(this.widget);
    }
}

export type WidgetTypes = "here-map-widget" | "line-chart-widget" | "donut-chart-widget";