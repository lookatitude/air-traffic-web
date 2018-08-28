import * as admin from "firebase-admin";
import {FirestoreConverter} from "./firestore-converter";

export class FirestorePaths {
    public static async getCollectionAsList<T>(collection: string): Promise<T[]> {
        return FirestoreConverter.toList<T>(await admin.firestore().collection(collection).get());
    }

    public static async getCollectionAsMap<T>(collection: string): Promise<Map<string, T>> {
        return FirestoreConverter.toMap<T>(await admin.firestore().collection(collection).get());
    }
}