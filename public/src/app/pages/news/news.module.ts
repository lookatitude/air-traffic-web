import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {NewsRoutingModule, routedComponents} from './news-routing.module';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {TableUtilsModule} from '../../@core/utils/table-utils/table.utils.module';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    Ng2SmartTableModule,
    TableUtilsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class NewsModule {
}
