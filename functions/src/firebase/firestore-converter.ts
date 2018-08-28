export class FirestoreConverter {
    public static toList<T>(querySnapshot: FirebaseFirestore.QuerySnapshot): Array<T> {
        const result: Array<T> = new Array<T>();

        for (const doc of querySnapshot.docs) {
            result.push(doc.data() as T);
        }

        return result;
    }

    public static toMap<T>(querySnapshot: FirebaseFirestore.QuerySnapshot): Map<string, T> {
        const result: Map<string, T> = new Map<string, T>();

        for (const doc of querySnapshot.docs) {
            result.set(doc.id, doc.data() as T);
        }

        return result;
    }
}