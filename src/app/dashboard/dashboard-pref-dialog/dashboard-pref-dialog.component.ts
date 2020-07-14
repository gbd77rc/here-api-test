import { Component, OnInit, Inject } from "@angular/core";
import { Preference } from 'src/app/shared/preference';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridType, DisplayGrid } from 'angular-gridster2';

@Component({
    templateUrl: "./dashboard-pref-dialog.component.html",
    styleUrls: ["./dashboard-pref-dialog.component.css"],
})
export class DashboardPrefDialogComponent implements OnInit {
    preference : Preference;
    prefForm: FormGroup;

    eGridType = GridType;
    eDisplayGrid = DisplayGrid;

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Preference
    ) {
        this.preference = data;
    }

    ngOnInit(): void {
        this.prefForm = this._formBuilder.group({
            gridType: [null, Validators.required],
            displayGrid: [null, Validators.required],
            maxCols: [0],
            maxRows: [0]
        });
        this.patchPerf(this.preference);
    }

    patchPerf(preference: Preference): void {
        this.prefForm.reset();
        const update = {
            gridType: GridType.Fixed,
            displayGrid: DisplayGrid.Always,
            maxCols: 0,
            maxRows: 0
        }

        for(const item of preference.values){
            switch (item.name) {
                case "gridType":
                    update.gridType = item.value;
                    break;
                case "displayGrid":
                    update.displayGrid = item.value;
                    break;
                default:
                    update[item.name] = item.value;
            }
        }

        this.prefForm.patchValue(update);
    }

    savePreference(): Preference {
        if(this.prefForm.valid){
            this.preference.values = [];
            this.preference.values.push({
                name: 'gridType',
                value: this.prefForm.get('gridType').value
            },
            {
                name: 'displayGrid',
                value: this.prefForm.get('displayGrid').value
            },
            {
                name: 'maxCols',
                value: this.prefForm.get('maxCols').value
            },
            {
                name: 'maxRows',
                value: this.prefForm.get('maxRows').value
            });
            return this.preference;
        }
        return null;
    }
}
