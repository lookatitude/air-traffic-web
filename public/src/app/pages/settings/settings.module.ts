import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {SettingsRoutingModule, routedComponents} from './settings-routing.module';
import {SmartTableService} from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    SettingsRoutingModule,
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
export class SettingsModule {
}
