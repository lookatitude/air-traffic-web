import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../@core/data/api.service';
import {Message} from '../../@core/models/message';
import {TopicType} from '../../@core/data/topic-type';
import {DefaultToasterService} from '../../@core/data/default-toaster.service';
import {urlValidator} from '../../@core/validators/url.validator';
import {NotificationClickAction} from '../../@core/data/notification-click-action';

interface Period {
  name: string;
  value: number;
}

interface PeriodOption {
  name: string;
  value: Period[];
}

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  public messageForm: FormGroup;

  public message: Message = {
    data: {URL: ''},
    notification: {
      title: '',
      body: '',
    },
    android: {
      priority: 'normal',
      ttl: 2419200000,
      notification: {
        sound: 'default',
      },
    },
    topic: TopicType.Standard.toString(),
  };

  public language: string = 'tr';

  public selectedPeriod: Period[];

  public periods: PeriodOption[] = [
    {name: 'Hafta', value: this.generatePeriods(0, 4, 604800000)},
    {name: 'Gün', value: this.generatePeriods(0, 7, 86400000)},
    {name: 'Saat', value: this.generatePeriods(0, 24, 3600000)},
    {name: 'Dakika', value: this.generatePeriods(0, 60, 60000)},
  ];

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toasterService: DefaultToasterService) {
    this.messageForm = this.formBuilder.group({
      topic: [''],
      url: ['', urlValidator],
      title: ['', Validators.required],
      body: [''],
      language: [''],
      priority: ['', Validators.required],
      sound: [''],
      ttl: ['', Validators.required],
    });

    this.selectedPeriod = this.periods[0].value;
  }

  public send(): void {
    if (this.message.data.URL !== null && this.message.data.URL !== '') {
      this.message.android.notification.clickAction = NotificationClickAction.UrlRedirect.toString();
    } else {
      this.message.android.notification.clickAction = null;
    }

    const message = JSON.parse(JSON.stringify(this.message));

    message.topic += '_' + this.language.toUpperCase();

    this.apiService.post('notification/send', message)
      .subscribe(
        result => {
          this.toasterService.success('', 'Bildirim başarıyla gönderildi');
        },

        reason => {
          this.toasterService.errorWithReason('', reason, 'Bildirim gönderilirken bir hata oluştu!');
        },
      );
  }

  private generatePeriods(min: number, max: number, multiplier: number): Period[] {
    const result: Period[] = [];

    for (let i: number = min; i < max + 1; i++) {
      result.push({name: i.toString(), value: (i * multiplier)});
    }

    return result;
  }
}
