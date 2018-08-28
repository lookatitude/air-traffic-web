import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {FirestoreService} from '../../@core/data/firestore.service';
import {News} from '../../@core/models/news';
import {FirestoreCollections} from '../../@core/firebase/firestore-collections';
import {CheckboxRenderComponent} from '../../@core/utils/table-utils/checkbox.render.component';
import {DefaultToasterService} from '../../@core/data/default-toaster.service';

@Component({
  selector: 'ngx-news',
  styleUrls: ['./news.component.scss'],
  templateUrl: './news.component.html',
})
export class NewsComponent {
  public source: LocalDataSource = new LocalDataSource();

  constructor(private db: FirestoreService,
              private toasterService: DefaultToasterService) {
    db.getCollection<News>(FirestoreCollections.News).subscribe(users => {
      this.source.load(users);
    });
  }

  public onEditConfirm(event): void {
    const newData = event.newData;

    this.db.update('news', newData.documentId, newData)
      .then(() => {
        event.confirm.resolve();

        this.toasterService.success('', 'Duyuru başarıyla güncellendi');
      })
      .catch(reason => {
        event.confirm.reject();

        this.toasterService.errorWithReason('', reason, 'Duyuru güncellenirken bir hata oluştu!');
      })
  }

  public onDeleteConfirm(event): void {
    const data = event.data;

    if (window.confirm('Silmek istediğinizden emin misiniz?')) {
      this.db.delete('news', data.documentId)
        .then(() => {
          event.confirm.resolve();

          this.toasterService.success('', 'Duyuru başarıyla silindi');
        })
        .catch(reason => {
          event.confirm.reject();

          this.toasterService.errorWithReason('', reason, 'Duyuru silinirken bir hata oluştu!');
        });
    } else {
      event.confirm.reject();
    }
  }

  public settings = {
    actions: {
      columnTitle: 'Aksiyon',
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
      title: {
        title: 'Başlık',
        type: 'string',
        width: '15%',
      },
      body: {
        title: 'İçerik',
        type: 'string',
        width: '85%',
      },
      important: {
        title: 'Önemli',
        type: 'custom',
        filter: false,
        editor: {
          type: 'checkbox',
        },
        renderComponent: CheckboxRenderComponent,
      },
    },
  };
}
