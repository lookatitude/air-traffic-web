import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {Observable} from 'rxjs/Rx';
import {mergeMap} from 'rxjs/internal/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      mergeMap<NbAuthToken, HttpEvent<any>>(token => {
        req = req.clone({
          setHeaders: {
            'Authorization': token.getValue(),
          },
        });

        return next.handle(req).toPromise();
      }),
    );
  }
}
