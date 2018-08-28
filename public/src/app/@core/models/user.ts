import {ApplicationInfo} from './application-info';
import {UserType} from './user-type';
import {FirestoreModel} from './firestore-model';

export interface User extends FirestoreModel {
  userId: string;
  fcmToken: string;
  type: UserType;
  language: string;
  admin: boolean;
  applicationInfo: ApplicationInfo;
  createdAt: Date;
  lastLogin: Date;
}
