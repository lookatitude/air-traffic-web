import {UserType} from "./user-type";
import {FirestoreModel} from "./firestore-model";
import {FirestoreCollections} from "../firebase/firestore-collections";

export abstract class User extends FirestoreModel {
    public static FieldUserId = "userId";
    public static FieldFcmToken = "fcmToken";
    public static FieldType = "type";
    public static FieldCreatedAt = "createdAt";
    public static FieldLastLogin = "lastLogin";

    public static getUserById(userId: string): Promise<User> {
        return FirestoreModel.getByDocumentId<User>(FirestoreCollections.users(), userId);
    }

    abstract get displayName(): string;

    userId: string;
    fcmToken: string;
    type: UserType;
    createdAt: Date;
    lastLogin: Date;
}