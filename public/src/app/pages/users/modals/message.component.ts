import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DefaultToasterService} from '../../../@core/data/default-toaster.service';
import {FirestoreService} from '../../../@core/data/firestore.service';
import {PilotUser} from '../../../@core/models/pilot-user';
import * as firebase from 'firebase';

@Component({
  selector: 'ngx-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  public user: PilotUser;

  public userMessage = {
    subject: '',
    body: '',
    from: '',
    to: '',
    read: false,
    createdAt: null,
  };

  public userMessageForm: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private db: FirestoreService,
              private toasterService: DefaultToasterService) {

    this.userMessageForm = this.formBuilder.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userMessage.from = firebase.auth().currentUser.uid;
    this.userMessage.to = this.user.userId;
  }

  public send(): void {
    this.userMessage.createdAt = this.db.serverTimestamp();

    this.db.add('messages', this.userMessage)
      .then(document => {
        this.toasterService.success('', 'Mesaj başarıyla gönderildi');
        this.closeModal();
      }).catch(reason => {
      this.toasterService.error('', 'Mesaj gönderilirken bir hata oluştu!');
    });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
