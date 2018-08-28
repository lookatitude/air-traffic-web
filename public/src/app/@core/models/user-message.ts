import {FirestoreModel} from './firestore-model';

export interface UserMessage extends FirestoreModel {
  subject: string;
  body: string;
  from: string;
  to: string;
  read: boolean;
  createdAt: Date;
}
