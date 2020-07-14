import {
    Component,
    OnInit,
    Input,
    OnChanges,
    OnDestroy,
    ElementRef,
    SimpleChanges,
    ChangeDetectionStrategy,
    ViewChild,
    Renderer2,
    Output,
    EventEmitter,
    Type,
    ChangeDetectorRef,
} from "@angular/core";
import {
    GridsterConfig,
    GridType,
    DisplayGrid,
    GridsterComponent,
    GridsterItem,
} from "angular-gridster2";
import { DashboardWidget } from "../models/dashboard-widget.model";
import { Subscription } from "rxjs";
import { MapWidgetComponent } from "../widgets/map-widget/map-widget.component";
import { LineChartWidgetComponent } from "../widgets/line-chart-widget/line-chart-widget.component";
import { Dashboard } from "../models/dashboard.model";
import { Widget } from "../models/widget.model";
import { DonutChartWidgetComponent } from "../widgets/donut-chart-widget/donut-chart-widget.component";
import { Preference } from "src/app/shared/preference";
import { Utils } from "src/app/shared/utils";
import { WidgetBase, WidgetTypes } from '../widgets/widget-base';


@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
    public options: GridsterConfig;
    @Input() dashboard: Dashboard;
    @Input() preference: Preference;
    canDrop: boolean = true;
    @Output() canSave = new EventEmitter<boolean>();
    widgetTypeNow: Array<WidgetTypes> =["here-map-widget", "line-chart-widget", "donut-chart-widget"]

    @ViewChild("gridster", {
        static: true,
    })
    gridster: GridsterComponent;

    components = {
        "here-map-widget": MapWidgetComponent,
        "line-chart-widget": LineChartWidgetComponent,
        "donut-chart-widget": DonutChartWidgetComponent,
    };

    protected subscription: Subscription;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetect: ChangeDetectorRef
    ) {
        this.options = {
            disablePushOnDrag: false,
            draggable: {
                enabled: true,
                stop: () => {
                    this.dashboardChanged();
                },
            },
            itemResizeCallback: this.itemResize.bind(this),
            enableEmptyCellDrop: true,
            emptyCellDropCallback: this.onDrop.bind(this),
            //emptyCellDragCallback: this.onDrop.bind(this),
            resizable: {
                enabled: true,
                stop: () => {
                    this.dashboardChanged();
                },
            },
            gridType: GridType.Fixed,
            displayGrid: DisplayGrid.OnDragAndResize,
            mobileBreakpoint: 640,
            maxCols: 15,
            maxRows: 10,
            minCols: 4,
            minRows: 4,
            fixedColWidth: 100,
            fixedRowHeight: 100,
            margin: 5,
            pushDirections: {
                north: true,
                east: true,
                south: true,
                west: true,
            },
            pushItems: true,
        };
    }

    itemResize(item, itemComponent) {
        console.info('itemResized', item, itemComponent);
        const newSize = {
            height:itemComponent.height,
            width:itemComponent.width
        }

        item["size"] = newSize;
        this._changeDetect.detectChanges();
    }

    dashboardChanged() {
        this.canSave.emit(true);
    }

    ngOnInit(): void {}

    updateOptions(): void {
        if (this.preference) {
            for (const pref of this.preference.values) {
                switch (pref.name) {
                    case "gridType":
                        this.options.gridType =
                            GridType[
                                Utils.getEnumKeyByEnumValue(
                                    GridType,
                                    pref.value,
                                )
                            ];
                        break;
                    case "displayGrid":
                        this.options.displayGrid =
                            DisplayGrid[
                                Utils.getEnumKeyByEnumValue(
                                    DisplayGrid,
                                    pref.value,
                                )
                            ];
                        break;
                    default:
                        this.options[pref.name] = pref.value;
                }
            }
            if (this.options.api) {
                this.options.api.optionsChanged();
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.preference) {
            this.preference = changes.preference.currentValue;
            this.updateOptions();
        }
        if (changes.dashboard) {
            this.dashboard = changes.dashboard.currentValue;
            this.dashboard.widgets.map(widget=>{
                widget["size"] ={
                    height:0,
                    width: 0
                }
            });
        }
    }

    ngOnDestroy() {}

    onDrop(event: DragEvent, item: GridsterItem): void {
        const widget: Widget = JSON.parse(event.dataTransfer.getData("widget"));

        if (widget) {
            const dashWidget = {
                name: widget.widgetName,
                componentRef: widget.componentRef,
                dataConfig: null,
                x: item.x,
                y: item.y,
                cols: widget.minCols || 1,
                rows: widget.minRows || 1,
            };
            this.dashboard.widgets.push(dashWidget);
            this.canSave.emit(true);
        }
    }

    removeItem(widget: DashboardWidget): void {
        const idx = this.dashboard.widgets.indexOf(widget);
        this.dashboard.widgets.splice(idx, 1);
        this.canSave.emit(true);
    }
}
