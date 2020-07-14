import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { MapSetting, HereMapType } from './map-setting.entity';
import { Utils } from 'src/app/shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { MapSettingDialogComponent } from './settings/map-setting-dialog.component';
import { WidgetBase } from '../widget-base';

declare var H: any;

@Component({
    selector:"here-map-widget",
    templateUrl: "./map-widget.component.html",
    styleUrls: ["./map-widget.component.css"],
})
export class MapWidgetComponent extends WidgetBase  implements OnInit, OnChanges, AfterViewInit {
    setting: MapSetting;
    private _hereVenueService: any;
    private _venueProvider: any;
    private _herePlatform: any;
    map: any;
    @ViewChild("map", { static: true }) public mapView: ElementRef;

    constructor(private _dialog: MatDialog, private _changeDetect: ChangeDetectorRef) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("1: ngOnChanges", changes);
        if (changes.widget) {
            this.widget = changes.widget.currentValue;
            this.setting = {
                name: this.widget.name || "",
                mapId: this.widget.dataConfig?.mapId || "",
                type: HereMapType[Utils.getEnumKeyByEnumValue(HereMapType, this.widget.dataConfig?.type || "map")],
                defaultZoom: this.widget.dataConfig?.defaultZoom || 5,
                mapKey: this.widget.dataConfig?.mapKey || "",
                venueKey: this.widget.dataConfig?.venueKey || ""
            }
        }
        console.log("1: ngOnChanges exit - ", this.setting);
    }

    ngOnInit(): void {
        console.log("2: ngOnInit", this._herePlatform);
        this.initializePlatform();
        console.log("2: ngOnInit exit - ", this._herePlatform);
    }

    ngAfterViewInit(){
        console.log("3: AfterViewInit", this.mapView);
        if (this._herePlatform){
            this.initializeMapView();
            if (this.setting.type === HereMapType.Venue){
                this.initializeVenue();
            }
        }
        console.log("3: AfterViewInit exit - ", this.mapView);
    }

    initializePlatform():void {
        console.log("4: initializedPlatform", this._herePlatform)
        if (this.setting.mapKey){
            this._herePlatform = new H.service.Platform({
                "apiKey": this.setting.mapKey
            });
        }
        console.log("4: initializedPlatform exit - ", this._herePlatform)
    }

    initializeMapView(): void {
        console.log("5: initializeMapView", this.mapView.nativeElement);
        if ( this._herePlatform && this.mapView ){
            const defaultLayers = this._herePlatform.createDefaultLayers();
            this.map = new H.Map(
                this.mapView.nativeElement,
                defaultLayers.vector.normal.map,
                {
                    zoom: this.setting.defaultZoom,
                    center: {
                        lat:37.7397,
                        lng:-121.4252
                    },
                    pixelRatio: window.devicePixelRatio || 1
                }
            );
            console.log('5: Resizing', this.map)
            this.map.getViewPort().resize();
        }
        console.log("5: initializeMapView exit - ", this.mapView.nativeElement);
    }

    initializeVenue():void {
        console.log("6: initializeVenue", this.map);
        if (this._herePlatform && this.map){
            this._hereVenueService = this._herePlatform.getVenuesService({
                "apiKey": this.setting.venueKey
            });
            this._venueProvider = new H.venues.Provider();
            this._hereVenueService.loadVenue(this.setting.mapId).then((venue)=>{
                this._venueProvider.addView(venue);
                this._venueProvider.setActiveVenue(venue);
                this.map.addLayer(new H.map.layer.TileLayer(
                    this._venueProvider
                ));
                this.map.setCenter(venue.getCenter());
                this.map.setZoom(this.setting.defaultZoom);
                console.log("6: initializeVenue ", this._venueProvider, venue);
            });
        }
        console.log("6: initializeVenue exit - ", this._hereVenueService);
    }

    onOpenSetting(event: MouseEvent| TouchEvent):void {
        const dialogRef = this._dialog.open(MapSettingDialogComponent, {
            width: "50%",
            data: this.setting
        });
        dialogRef.afterClosed().subscribe((result: MapSetting) => {
            if (result){
                this.widget.name = result.name;
                this.widget.dataConfig = {};
                this.widget.dataConfig["mapId"] = this.setting.mapId;
                this.widget.dataConfig["type"] = this.setting.type;
                this.widget.dataConfig["defaultZoom"] = this.setting.defaultZoom;
                this.widget.dataConfig["mapKey"] = this.setting.mapKey;
                this.widget.dataConfig["venueKey"] = this.setting.venueKey;
                this._changeDetect.detectChanges();
                this.onChanged.emit(true);
                this.initializePlatform();
                this.initializeMapView();
                if (this.setting.type === HereMapType.Venue){
                    this.initializeVenue();
                }
            }
        });
    }
}
