import {FirestoreModel} from "./firestore-model";
import {FirestoreCollections} from "../firebase/firestore-collections";

export class MessageTemplate extends FirestoreModel {
    public static FieldType = "type";

    title: string;
    body: string;
    enabled: boolean;
    type: string;

    public static getTemplateByType(type: string): Promise<MessageTemplate> {
        return FirestoreModel.getFirstByQuery(
            FirestoreCollections.templates().where(MessageTemplate.FieldType, "==", type)
        );
    }
}