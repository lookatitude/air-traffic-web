import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
  }, {
    path: 'notifications',
    loadChildren: './notifications/notifications.module#NotificationsModule',
  }, {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  }, {
    path: 'templates',
    loadChildren: './templates/templates.module#TemplatesModule',
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
