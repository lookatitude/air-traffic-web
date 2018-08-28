import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NbAuthService} from '@nebular/auth';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      )
  }
}
