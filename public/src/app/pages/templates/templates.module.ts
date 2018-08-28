import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {TemplatesRoutingModule, routedComponents} from './templates-routing.module';
import {SmartTableService} from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    TemplatesRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class TemplatesModule {
}
