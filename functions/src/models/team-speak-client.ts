import {FirestoreModel} from "./firestore-model";

export class TeamSpeakClient extends FirestoreModel {
    id: number;
    name: string;
    connectionTime: Date;
}