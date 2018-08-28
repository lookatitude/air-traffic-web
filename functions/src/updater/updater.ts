import {FirestoreModel} from "../models/firestore-model";
import {CollectionUtil} from "../utils/collection-util";
import * as admin from "firebase-admin";

export class Updater<T extends FirestoreModel> {
    private identity: string;
    private collection: FirebaseFirestore.CollectionReference;

    constructor(identity: string, collection: FirebaseFirestore.CollectionReference) {
        this.identity = identity;
        this.collection = collection;
    }

    public getAll(): Promise<any> {
        return FirestoreModel.getAll(this.collection);
    }

    public create(item: T): T {
        return item;
    }

    public update(item: T, oldItem: T): T {
        return item;
    }

    public insert(items: T[]): Promise<any> {
        return this.getAll()
            .then(oldItems => {
                const batch = admin.firestore().batch();

                for (const item of items) {
                    //batch.update(this.collection.doc(item[this.identity].toString()), item);
                    //batch.set(this.collection.doc(item[this.identity].toString()), item);

                    if (CollectionUtil.contains(oldItems, item, this.identity)) {
                        const newItem: T = this.update(item, CollectionUtil.get(oldItems, item, this.identity));

                        if(newItem){
                            batch.update(this.collection.doc(item[this.identity].toString()), newItem);
                        }
                    } else {
                        const newItem: T = this.create(item);

                        if(newItem){
                            batch.set(this.collection.doc(item[this.identity].toString()), newItem);
                        }
                    }
                }

                return batch.commit();
            });
    }

    public delete(items: T[]) {
        return FirestoreModel.getFromQuery<T>(this.collection)
            .then(oldItems => {
                const batch = admin.firestore().batch();

                for (const oldItem of oldItems) {
                    if (!CollectionUtil.contains<T>(items, oldItem, this.identity)) {
                        batch.delete(this.collection.doc(oldItem[this.identity].toString()));
                    }
                }

                return batch.commit();
            });
    }
}