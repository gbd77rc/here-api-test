import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';

export class Utils {
    public static formatError(error: HttpErrorResponse): string {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return "An error occurred: " + error.error.message;
        } else if (typeof error === "string" ) 
        {
            return error;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            let msg = "Unknown error";
            if (error.error && typeof error.error === "string") {
                msg = <string>error.error;
            } else if (error.message) {
                msg = error.message;
            } 
            return `Backend3 returned - ${msg}`;
        }
    }

    public static handleError(err: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.statusText}`;
        }
        return throwError(errorMessage);
    }

    public static compareIt(a: any, b: any): boolean {
        if (!a || !b) {
            return false;
        }
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    public static getEnumKeyByEnumValue<T>(myEnum:T, enumValue:string): string {
        let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
        return keys.length > 0 ? keys[0]: null;
    }
}
