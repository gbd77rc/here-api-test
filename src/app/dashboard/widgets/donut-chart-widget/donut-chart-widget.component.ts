import { Component, OnInit } from '@angular/core';
import { WidgetBase } from '../widget-base';

@Component({
  selector: 'donut-chart-widget',
  templateUrl: './donut-chart-widget.component.html',
  styleUrls: ['./donut-chart-widget.component.css']
})
export class DonutChartWidgetComponent extends WidgetBase implements OnInit {

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
