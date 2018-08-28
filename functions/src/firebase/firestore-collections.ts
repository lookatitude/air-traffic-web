import * as admin from "firebase-admin";

export class FirestoreCollections {
    public static Users = "users";
    public static Messages = "messages";
    public static News = "news";
    public static Clients = "clients";
    public static TeamSpeak = "teamspeak";
    public static TeamSpeakClients = "clients";
    public static Surveys = "surveys";
    public static SurveyOptions = "options";
    public static Templates = "templates";
    public static Settings = "settings";

    public static users(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.Users);
    }

    public static messages(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.Messages);
    }

    public static news(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.News);
    }

    public static clients(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.Clients);
    }

    public static teamSpeak(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.TeamSpeak);
    }

    public static teamSpeakClientsByChannelId(channelId: number): FirebaseFirestore.CollectionReference {
        return FirestoreCollections.teamSpeakClients(FirestoreCollections.teamSpeak().doc(channelId.toString()));
    }

    public static teamSpeakClients(document: FirebaseFirestore.DocumentReference): FirebaseFirestore.CollectionReference {
        return document.collection(FirestoreCollections.TeamSpeakClients);
    }

    public static surveys(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.Surveys);
    }

    public static templates(): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(FirestoreCollections.Templates);
    }
}