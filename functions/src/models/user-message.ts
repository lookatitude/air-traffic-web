import {FirestoreModel} from "./firestore-model";

export class UserMessage extends FirestoreModel {
    static FieldSubject: string = "subject";
    static FieldBody: string = "body";
    static FieldFrom: string = "from";
    static FieldTo: string = "to";
    static FieldRead: string = "read";
    static FieldCreatedAt: string = "createdAt";

    subject: string;
    body: string;
    from: string;
    to: string;
    read: boolean;
    createdAt: Date;
}