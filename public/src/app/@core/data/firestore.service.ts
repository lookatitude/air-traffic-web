import * as firebase from 'firebase';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from 'angularfire2/firestore';
import {FirestoreMap, FirestoreModel} from '../models/firestore-model';
import {QueryFn} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import FieldValue = firebase.firestore.FieldValue;
import WriteBatch = firebase.firestore.WriteBatch;

@Injectable()
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {
  }

  public get<T extends FirestoreModel>(collectionPath: string, documentPath: string): Observable<T> {
    return this.db().collection(collectionPath).doc<T>(documentPath).snapshotChanges().pipe(
      map<Action<DocumentSnapshot<T>>, T>(action => {
        const documentId = action.payload.id;
        const data = action.payload.data();

        return Object.assign(data, {documentId: documentId}) as T;
      }),
    );
  }

  public getCollection<T extends FirestoreModel>(collectionPath: string, queryFn?: QueryFn): Observable<T[]> {
    return this.db().collection<T>(collectionPath, queryFn).snapshotChanges().pipe(
      map<DocumentChangeAction<T>[], T[]>(actions => actions.map(action => {
        const documentId = action.payload.doc.id;
        const data = action.payload.doc.data();

        return Object.assign(data, {documentId: documentId});
      })),
    );
  }

  public getCollectionAsMap<T extends FirestoreMap>(collectionPath: string, queryFn?: QueryFn): Observable<T> {
    return this.db().collection<T>(collectionPath, queryFn).snapshotChanges().pipe(
      map<DocumentChangeAction<T>[], T>(actions => actions.map(action => {
        const documentId = action.payload.doc.id;
        const data = action.payload.doc.data();

        return Object.assign(data, {documentId: documentId});
      }).reduce((data, item) => {
        data[item.documentId] = item;

        return data;
      }, {}) as T),
    );
  }

  public getCollectionAsMapByField<T extends FirestoreMap>(collectionPath: string, field: string, queryFn?: QueryFn): Observable<T> {
    return this.db().collection<T>(collectionPath, queryFn).snapshotChanges().pipe(
      map<DocumentChangeAction<T>[], T>(actions => actions.map(action => {
        const documentId = action.payload.doc.id;
        const data = action.payload.doc.data();

        return Object.assign(data, {documentId: documentId});
      }).reduce((data, item) => {
        data[item[field]] = item;

        return data;
      }, {}) as T),
    );
  }

  public update(collectionPath: string, documentPath: string, data: any): Promise<void> {
    delete data['documentId'];

    return this.db().collection(collectionPath).doc(documentPath).update(data);
  }

  public delete(collectionPath: string, documentPath: string): Promise<void> {
    return this.db().collection(collectionPath).doc(documentPath).delete();
  }

  public set(documentPath: string, data: any): Promise<void> {
    return this.db().doc(documentPath).set(data);
  }

  public add(collectionPath: string, data: any): Promise<DocumentReference> {
    return this.db().collection(collectionPath).add(data);
  }

  public db(): AngularFirestore {
    return this.firestore;
  }

  public batch(): WriteBatch {
    return this.db().firestore.batch();
  }

  public serverTimestamp(): FieldValue {
    return FieldValue.serverTimestamp();
  }
}
