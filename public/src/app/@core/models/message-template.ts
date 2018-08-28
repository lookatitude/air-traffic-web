import {FirestoreMap, FirestoreModel} from './firestore-model';

export interface MessageTemplates extends FirestoreMap {
  [key: string]: MessageTemplate;
}

export interface MessageTemplate extends FirestoreModel {
  title: string;
  body: string;
  enabled: boolean;
  type: string;
}
