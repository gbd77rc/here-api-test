import { Component, OnInit } from '@angular/core';
import { WidgetBase } from '../widget-base';

@Component({
  selector: 'line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.css']
})
export class LineChartWidgetComponent extends WidgetBase implements OnInit {

  constructor() {
      super();
  }

  ngOnInit(): void {
  }

  onOpenSetting(event: MouseEvent| TouchEvent):void {
    // const dialogRef = this._dialog.open(MapSettingDialogComponent, {
    //     data: this.setting
    // });
    // console.dir(this.setting);
    // dialogRef.afterClosed().subscribe();
}
}
