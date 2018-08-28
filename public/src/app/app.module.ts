/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FirestoreService} from './@core/data/firestore.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthGuard} from './@core/auth/auth-guard';
import {ApiService} from './@core/data/api.service';
import {DefaultToasterService} from './@core/data/default-toaster.service';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {TokenInterceptor} from './@core/auth/token.interceptor';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ToasterService,
    AuthGuard,
    AngularFireAuth,
    FirestoreService,
    ApiService,
    DefaultToasterService,
  ],
})
export class AppModule {
}
