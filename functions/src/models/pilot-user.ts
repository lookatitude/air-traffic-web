import {User} from "./user";
import {FirestoreCollections} from "../firebase/firestore-collections";
import {UserType} from "./user-type";
import {FirestoreModel} from "./firestore-model";

export class PilotUser extends User {
    public static FieldFirstName = "firstName";
    public static FieldLastName = "lastName";
    public static FieldCallsign = "callsign";
    public static FieldIvaoId = "ivaoId";
    public static FieldEmail = "email";
    public static FieldPassword = "password";

    public static getUserById(userId: string): Promise<PilotUser> {
        return FirestoreModel.getFirstByQuery<PilotUser>(
            FirestoreCollections.users().where(User.FieldType, "==", UserType.Pilot).where(PilotUser.FieldUserId, "==", userId)
        );
    }

    public static getUserByIvaoId(ivaoId: string): Promise<PilotUser> {
        return FirestoreModel.getFirstByQuery<PilotUser>(
            FirestoreCollections.users().where(User.FieldType, "==", UserType.Pilot).where(PilotUser.FieldIvaoId, "==", ivaoId)
        );
    }

    get displayName(): string {
        return this.firstName + " " + this.lastName;
    }

    firstName: string;
    lastName: string;
    callsign: string;
    ivaoId: string;
    email: string;
}