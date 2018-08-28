import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageComponent} from './modals/message.component';
import {NotificationComponent} from './modals/notification.component';

@Component({
  selector: 'ngx-icon-view',
  styleUrls: ['./options.component.scss'],
  template: `
    <div class="icon-bar">
      <a (click)="onMessageClick($event)"><i class="fa fa-envelope"></i></a>
      <a (click)="onNotificationClick($event)"><i class="fa fa-bell"></i></a>
    </div>
  `,
})
export class OptionsComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  public onMessageClick(event): void {
    const messageModal = this.modalService.open(MessageComponent, {size: 'lg', container: 'nb-layout'});

    messageModal.componentInstance.user = this.rowData;
  }

  public onNotificationClick(event): void {
    const notificationModal = this.modalService.open(NotificationComponent, {size: 'lg', container: 'nb-layout'});

    notificationModal.componentInstance.user = this.rowData;
  }
}
