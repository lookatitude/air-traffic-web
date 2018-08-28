import {User} from "./user";

export class Guest extends User {
    public static FieldDisplayName = "displayName";

    displayName: string;
}