import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../@core/data/firestore.service';
import {DefaultToasterService} from '../../@core/data/default-toaster.service';
import {FirestoreCollections} from '../../@core/firebase/firestore-collections';
import {MessageTemplates} from '../../@core/models/message-template';

@Component({
  selector: 'ngx-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
  public templates: MessageTemplates;
  public templateName: string = 'NICE_FLIGHT';
  public templateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private db: FirestoreService,
              private toasterService: DefaultToasterService) {
    this.templateForm = this.formBuilder.group({
      templateName: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      enabled: [''],
    });

    db.getCollectionAsMapByField<MessageTemplates>(FirestoreCollections.Templates, 'type').subscribe(templates => {
      this.templates = templates;
    });
  }

  public save(): void {
    this.db.update(FirestoreCollections.Templates, this.templates[this.templateName].documentId, this.templates[this.templateName])
      .then(result => {
        this.toasterService.success('', 'Kayıt başarılı');
      })
      .catch(reason => {
        this.toasterService.error('', 'Kaydedilirken bir hata oluştu!');
      });
  }
}
