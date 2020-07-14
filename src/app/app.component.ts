import { Component, OnInit, OnDestroy } from '@angular/core';
import { slideInAnimation } from './app.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'seshat-portal';
    _isLoggedIn: boolean = true;
    username = "Alice";

    constructor() {
    }

    async ngOnInit(): Promise<void> {}

    ngOnDestroy(): void {
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}
