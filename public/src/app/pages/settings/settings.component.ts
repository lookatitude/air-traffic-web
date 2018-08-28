import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../@core/data/firestore.service';
import {DefaultToasterService} from '../../@core/data/default-toaster.service';
import {Setting, Settings} from '../../@core/models/setting';
import {FirestoreCollections} from '../../@core/firebase/firestore-collections';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public settings: Settings;

  public companyInformationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private db: FirestoreService,
              private toasterService: DefaultToasterService) {
    this.companyInformationForm = this.formBuilder.group({
      icao: ['', Validators.required],
      iata: ['', Validators.required],
    });

    db.getCollectionAsMap<Settings>(FirestoreCollections.Settings).subscribe(settings => {
      this.settings = settings;
    });
  }

  public save(setting: Setting): void {
    this.db.update(FirestoreCollections.Settings, setting.documentId, setting)
      .then(result => {
        this.toasterService.success('', 'Kayıt başarılı');
      })
      .catch(reason => {
        this.toasterService.error('', 'Kaydedilirken bir hata oluştu!');
      });
  }
}
