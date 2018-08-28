import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {UsersRoutingModule, routedComponents} from './users-routing.module';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {OptionsComponent} from './options.component';
import {MessageComponent} from './modals/message.component';
import {NotificationComponent} from './modals/notification.component';
import {TableUtilsModule} from '../../@core/utils/table-utils/table.utils.module';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    TableUtilsModule,
  ],
  declarations: [
    ...routedComponents,
    OptionsComponent,
    MessageComponent,
    NotificationComponent,
  ],
  providers: [
    SmartTableService,
  ],
  entryComponents: [
    OptionsComponent,
    MessageComponent,
    NotificationComponent,
  ],
})
export class UsersModule {
}
