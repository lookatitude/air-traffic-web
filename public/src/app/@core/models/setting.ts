import {FirestoreMap, FirestoreModel} from './firestore-model';

export interface Settings extends FirestoreMap {
  [key: string]: Setting;
}

export interface Setting extends FirestoreModel {
  settingId: string;
}

export interface CompanyInformation extends Setting {
  icao: string;
  iata: string;
}
