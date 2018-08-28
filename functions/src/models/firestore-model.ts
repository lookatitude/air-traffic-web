export abstract class FirestoreModel {
    document?: FirebaseFirestore.DocumentSnapshot;
    reference?: FirebaseFirestore.DocumentReference;
    documentId?: string;

    public static getByDocumentId<T extends FirestoreModel>(collection: FirebaseFirestore.CollectionReference, documentId: string): Promise<T> {
        return FirestoreModel.getFromDocument(collection.doc(documentId));
    }

    public static getFromDocument<T extends FirestoreModel>(document: FirebaseFirestore.DocumentReference): Promise<T> {
        return document.get()
            .then(documentSnapshot => {
                return FirestoreModel.createFromDocument<T>(documentSnapshot);
            });
    }

    public static getFirstByQuery<T extends FirestoreModel>(query: FirebaseFirestore.Query): Promise<T> {
        return FirestoreModel.getFromQuery<T>(query)
            .then(items => {
                if (items.length === 0) {
                    return null;
                }

                return items[0];
            });
    }

    public static getAll<T extends FirestoreModel>(collection: FirebaseFirestore.CollectionReference): Promise<T[]> {
        return this.getFromQuery(collection);
    }

    public static getFromQuery<T extends FirestoreModel>(query: FirebaseFirestore.Query): Promise<T[]> {
        return query.get().then(querySnapshot => {
            return FirestoreModel.createFromQuery<T>(querySnapshot);
        });
    }

    public static createFromQuery<T extends FirestoreModel>(querySnapshot: FirebaseFirestore.QuerySnapshot): T[] {
        const result: Array<T> = new Array<T>();

        for (const documentSnapshot of querySnapshot.docs) {
            result.push(FirestoreModel.createFromDocument<T>(documentSnapshot));
        }

        return result;
    }

    public static createFromDocument<T extends FirestoreModel>(documentSnapshot: FirebaseFirestore.DocumentSnapshot): T {
        const model: T = documentSnapshot.data() as T;
        model.document = documentSnapshot;
        model.reference = documentSnapshot.ref;
        model.documentId = documentSnapshot.id;

        return model;
    }
}