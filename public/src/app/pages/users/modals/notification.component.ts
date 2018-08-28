import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../@core/data/api.service';
import {DefaultToasterService} from '../../../@core/data/default-toaster.service';
import {Message} from '../../../@core/models/message';
import {PilotUser} from '../../../@core/models/pilot-user';
import {urlValidator} from '../../../@core/validators/url.validator';

interface Period {
  name: string;
  value: number;
}

interface PeriodOption {
  name: string;
  value: Period[];
}

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  public user: PilotUser;

  public message: Message = {
    data: {url: ''},
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
  };

  public messageForm: FormGroup;

  public selectedPeriod: Period[];

  public periods: PeriodOption[] = [
    {name: 'Hafta', value: this.generatePeriods(0, 4, 604800000)},
    {name: 'Gün', value: this.generatePeriods(0, 7, 86400000)},
    {name: 'Saat', value: this.generatePeriods(0, 24, 3600000)},
    {name: 'Dakika', value: this.generatePeriods(0, 60, 60000)},
  ];

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toasterService: DefaultToasterService) {
    this.messageForm = this.formBuilder.group({
      url: ['', urlValidator],
      title: ['', Validators.required],
      body: [''],
      priority: ['', Validators.required],
      sound: [''],
      ttl: ['', Validators.required],
    });

    this.selectedPeriod = this.periods[0].value;
  }

  ngOnInit(): void {
    this.message.token = this.user.fcmToken;
  }

  public send(): void {
    this.apiService.post('notification/send', this.message)
      .subscribe(
        result => {
          this.toasterService.success('', 'Bildirim başarıyla gönderildi');
        },

        reason => {
          this.toasterService.error('', 'Bildirim gönderilirken bir hata oluştu!');
        },
      );
  }

  public closeModal(): void {
    this.activeModal.close();
  }

  private generatePeriods(min: number, max: number, multiplier: number): Period[] {
    const result: Period[] = [];

    for (let i: number = min; i < max + 1; i++) {
      result.push({name: i.toString(), value: (i * multiplier)});
    }

    return result;
  }
}
