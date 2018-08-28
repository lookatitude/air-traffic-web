import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  public post(method: string, body: any): Observable<any> {
    return this.http.post(environment.api.url + method, body, {headers: this.headers});
  }
}
