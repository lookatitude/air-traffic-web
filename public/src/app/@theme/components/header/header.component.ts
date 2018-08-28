import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {NbAuthService} from '@nebular/auth';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  stage = '';

  constructor(private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService) {
    this.authService.onTokenChange()
      .subscribe(token => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.stage = environment.production ? 'Production' : 'Development';
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
