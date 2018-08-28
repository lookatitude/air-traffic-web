import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'ngx-checkbox',
  styleUrls: ['./checkbox.render.component.scss'],
  template: `<i class="material-icons md-24">done</i>`,
  //template: `<i class="{{this.value ? 'ion-checkmark-round' : ''}}"></i>`,
})

export class CheckboxRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  rowData: any;

  ngOnInit(): void {
  }
}
