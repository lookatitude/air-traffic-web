import {NbAuthResult, NbAuthStrategy, NbAuthStrategyClass} from '@nebular/auth';
import {Observable} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseAuth} from 'angularfire2';
import {FirebaseAuthStrategyOptions} from './firebase-auth-strategy-options';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreService} from '../data/firestore.service';
import {User} from '../models/user';

@Injectable()
export class FirebaseAuthStrategy extends NbAuthStrategy {
  private auth: FirebaseAuth = this.fireAuth.auth;

  constructor(private fireAuth: AngularFireAuth, private firestore2: AngularFirestore, private db: FirestoreService) {
    super();
  }

  static setup(options?: FirebaseAuthStrategyOptions): [NbAuthStrategyClass, FirebaseAuthStrategyOptions] {
    return [FirebaseAuthStrategy, options];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    return this.db.getCollection<User>('users', ref => ref.where('email', '==', data.email))
      .flatMap(users => {
        if (users.length === 0) {
          return Observable.throwError('Kullanıcı bulunamadı')
        }

        return Observable.of(users);
      })
      .flatMap(x => x)
      .first<User>()
      .flatMap(user => {
        if (!user.admin) {
          return Observable.throwError('Admin Değil');
        }

        return Observable.fromPromise(this.auth.signInWithEmailAndPassword(data.email, data.password)
          .then(authResult => authResult.user.getIdToken(true)))
      })
      .map(tokenString => new NbAuthResult(
        true,
        null,
        this.getOption('login.redirect.success'),
        null,
        null,
        this.createToken(tokenString)))
      .catch(reason => Observable.of(new NbAuthResult(
        false,
        null,
        this.getOption('login.redirect.failure'),
        [reason])));
  }

  register(data?: any): Observable<NbAuthResult> {
    return null;
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return null;
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return null;
  }

  logout(): Observable<NbAuthResult> {
    return Observable.fromPromise(this.auth.signOut())
      .map(() => new NbAuthResult(
        true,
        null,
        this.getOption('logout.redirect.success')))
      .catch(reason => Observable.of(new NbAuthResult(
        false,
        null,
        this.getOption('logout.redirect.success'),
        [reason])));
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    return Observable.fromPromise(this.auth.currentUser.getIdToken())
      .map(tokenString => new NbAuthResult(
        true,
        null,
        this.getOption('refreshToken.redirect.success'),
        null,
        null,
        this.createToken(tokenString)))
      .catch(reason => Observable.of(new NbAuthResult(
        false,
        null,
        this.getOption('refreshToken.redirect.success'),
        [reason])));
  }
}
