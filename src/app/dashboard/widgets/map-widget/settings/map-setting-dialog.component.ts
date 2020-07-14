import { Component, OnInit, Inject } from "@angular/core";
import { MapSetting, HereMapType } from '../map-setting.entity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "app-map-setting-dialog",
    templateUrl: "./map-setting-dialog.component.html",
    styleUrls: ["./map-setting-dialog.component.css"],
})
export class MapSettingDialogComponent implements OnInit {
    setting : MapSetting;
    settingForm: FormGroup;

    eMapType = HereMapType;
    constructor( private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: MapSetting) {
            this.setting = data;
    }

    ngOnInit(): void {
        this.settingForm = this._formBuilder.group({
            name: ["", Validators.required],
            type: [null, Validators.required],
            mapKey: ["", Validators.required],
            venueKey: ["", Validators.required],
            mapId: [""],
            defaultZoom: [0]
        });
        this.patchSetting(this.setting);
    }

    patchSetting(setting: MapSetting){
        this.settingForm.patchValue(setting);
    }

    saveSetting(): MapSetting {
        if(this.settingForm.valid){
            this.setting.defaultZoom = this.settingForm.get('defaultZoom').value;
            this.setting.name = this.settingForm.get('name').value;
            this.setting.type = this.settingForm.get('type').value;
            this.setting.mapKey = this.settingForm.get('mapKey').value;
            this.setting.venueKey = this.settingForm.get('venueKey').value;
            this.setting.mapId = this.settingForm.get('mapId').value;
            return this.setting;
        }
        return null;
    }
}
