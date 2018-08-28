import * as admin from "firebase-admin";
import {User} from "../models/user";
import {MessageTemplate} from "../models/message-template";
import {Formatter} from "./formatter";
import {FirestoreCollections} from "../firebase/firestore-collections";
import FieldValue = admin.firestore.FieldValue;

export class Messages {
    public static sendWelcomeMessage(user: User): Promise<object> {
        return MessageTemplate.getTemplateByType("WELCOME_" + user.type.toString())
            .then(template => {
                if (template === null || !template.enabled) {
                    return null;
                }

                const userMessage = {
                    subject: Formatter.replaceForUser(template.title, user),
                    body: Formatter.replaceForUser(template.body, user),
                    from: null,
                    to: user.userId,
                    read: false,
                    createdAt: FieldValue.serverTimestamp()
                };

                return admin.firestore()
                    .collection(FirestoreCollections.Messages)
                    .add(userMessage);
            });
    }
}