import {ClientType} from "./client-type";
import {FirestoreModel} from "./firestore-model";

export abstract class Client extends FirestoreModel {
    callsign: string;
    ivaoId: string;
    name: string;
    type: ClientType;
    latitude: number;
    longitude: number;
    altitude: number;
    server: string;
    protocol: string;
    combinedRating: string;
    connectionTime: Date;
    softwareName: string;
    softwareVersion: string;
    administrativeVersion: string;
    rating: number;
    online: boolean;
}