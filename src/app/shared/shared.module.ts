import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { NotificationService } from "./notification.service";
import { GridsterModule } from "angular-gridster2";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
    exports: [
        CommonModule,
        HttpClientModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        GridsterModule,
        DragDropModule,
    ],
    providers: [NotificationService],
})
export class SharedModule {}
