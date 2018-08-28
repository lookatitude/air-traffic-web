import {FirestoreModel} from './firestore-model';

export interface News extends FirestoreModel {
  title: string;
  body: string;
  from: string;
  active: boolean;
  important: boolean;
  createdAt: Date;
}
