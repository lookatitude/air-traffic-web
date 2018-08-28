import {Updater} from "./updater";
import {Client} from "../models/client";
import {FirestoreCollections} from "../firebase/firestore-collections";

export class IvaoUpdater extends Updater<Client> {
    constructor() {
        super("ivaoId", FirestoreCollections.clients());
    }

    public create(item: Client): Client {
        return super.create(item);
    }

    public update(item: Client, oldItem: Client): Client {
        return super.update(item, oldItem);
    }
}