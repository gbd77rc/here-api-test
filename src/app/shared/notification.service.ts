import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    constructor(private _toaster: ToastrService) {}

    showSuccess(message : string, title: string) {
        this._toaster.success(message, title, {
            closeButton: true,
            newestOnTop: true,
            progressBar: true
        });
    }

    showError(message : string, title: string) {
        this._toaster.error(message, title, {
            closeButton: true,
            newestOnTop: true,
            disableTimeOut: true
        });
    }

    showInfo(message : string, title: string) {
        this._toaster.info(message, title);
    }

    showWarning(message : string, title: string) {
        this._toaster.warning(message, title,{
            closeButton: true,
            newestOnTop: true,
            disableTimeOut: true
        });
    }
}
