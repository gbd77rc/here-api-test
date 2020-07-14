import { WidgetBase, WidgetTypes } from "../widgets/widget-base";
import { Component, Type, Input } from "@angular/core";

@Component({
    selector: "dashboard-layout",
    template:`
    <ng-container *ngxComponentOutlet="component;context:{widget:widget}">
    </ng-container>`
})
export class DashboardLayoutComponent extends WidgetBase  {
    @Input() component: WidgetBase;
    onOpenSetting(): void {}
}
