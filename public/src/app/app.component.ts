/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {NbMenuService} from '@nebular/theme';
import {filter} from 'rxjs/internal/operators';
import {NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {ToasterConfig} from 'angular2-toaster';
import {DefaultToasterService} from './@core/data/default-toaster.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-app',
  template: `
    <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  public toasterConfig: ToasterConfig;

  constructor(private analytics: AnalyticsService,
              private authService: NbAuthService,
              private menuService: NbMenuService,
              private toasterService: DefaultToasterService,
              private router: Router) {
    this.toasterConfig = this.toasterService.toasterConfig;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();

    this.menuService.onItemClick()
      .pipe(
        filter((event: { tag: string, item: any }) => event.tag === 'userContextMenu'))
      .subscribe((event: { tag: string, item: any }) => {
        if (event.item.title === 'Log out') {
          this.authService.logout('email')
            .subscribe(authResult => {
              const redirect = authResult.getRedirect();

              if (redirect) {
                this.router.navigate([redirect]);
              }
            });
        }
      });
  }
}
