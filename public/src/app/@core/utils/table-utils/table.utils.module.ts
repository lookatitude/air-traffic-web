import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {EmptyEditorComponent} from './empty.editor.component';
import {CheckboxRenderComponent} from './checkbox.render.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    EmptyEditorComponent,
    CheckboxRenderComponent,
  ],
  entryComponents: [
    EmptyEditorComponent,
    CheckboxRenderComponent,
  ],
})

export class TableUtilsModule {
}
