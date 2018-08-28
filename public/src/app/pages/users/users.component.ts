import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {FirestoreService} from '../../@core/data/firestore.service';
import {PilotUser} from '../../@core/models/pilot-user';
import {OptionsComponent} from './options.component';
import {EmptyEditorComponent} from '../../@core/utils/table-utils/empty.editor.component';
import {FirestoreCollections} from '../../@core/firebase/firestore-collections';
import {DefaultToasterService} from '../../@core/data/default-toaster.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public source: LocalDataSource = new LocalDataSource();

  constructor(private db: FirestoreService,
              private toasterService: DefaultToasterService) {
    db.getCollection<PilotUser>(FirestoreCollections.Users).subscribe(users => {
      this.source.load(users);
    });
  }

  public onEditConfirm(event): void {
    const newData = event.newData;

    this.db.update('users', newData.documentId, newData)
      .then(() => {
        event.confirm.resolve();

        this.toasterService.success('', 'Kullanıcı başarıyla güncellendi');
      })
      .catch(reason => {
        event.confirm.reject();

        this.toasterService.errorWithReason('', reason, 'Kullanıcı güncellenirken bir hata oluştu!');
      })
  }

  public onDeleteConfirm(event): void {
    const data = event.data;

    if (window.confirm('Silmek istediğinizden emin misiniz?')) {
      this.db.delete('users', data.documentId)
        .then(() => {
          event.confirm.resolve();

          this.toasterService.success('', 'Kullanıcı başarıyla silindi');
        })
        .catch(reason => {
          event.confirm.reject();

          this.toasterService.errorWithReason('', reason, 'Kullanıcı silinirken bir hata oluştu!');
        });
    } else {
      event.confirm.reject();
    }
  }

  public settings = {
    actions: {
      columnTitle: 'Aksiyon',
      add: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      callsign: {
        title: 'Çağrı Kodu',
        type: 'string',
      },
      ivaoId: {
        title: 'Ivao ID',
        type: 'string',
      },
      firstName: {
        title: 'Adı',
        type: 'string',
      },
      lastName: {
        title: 'Soyadı',
        type: 'string',
      },
      email: {
        title: 'Eposta',
        type: 'string',
      },
      userActions: {
        title: '',
        type: 'custom',
        filter: false,
        editor: {
          type: 'custom',
          component: EmptyEditorComponent,
        },
        renderComponent: OptionsComponent,
      },
    },
  };
}
