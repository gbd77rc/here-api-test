import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { SharedModule } from './shared/shared.module';
import { NotificationService } from './shared/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SeshatData } from './dashboard/data/data';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  exports:[
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
    InMemoryWebApiModule.forRoot(SeshatData, { delay: 1000 }),

  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
