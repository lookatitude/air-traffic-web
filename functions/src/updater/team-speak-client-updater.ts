import {Updater} from "./updater";
import {TeamSpeakClient} from "../models/team-speak-client";
import {FirestoreCollections} from "../firebase/firestore-collections";

export class TeamSpeakClientUpdater extends Updater<TeamSpeakClient> {
    constructor(channelId: number) {
        super("id", FirestoreCollections.teamSpeakClients(FirestoreCollections.teamSpeak().doc(channelId.toString())));
    }

    public create(item: TeamSpeakClient): TeamSpeakClient {
        return super.create(item);
    }

    public update(item: TeamSpeakClient, oldItem: TeamSpeakClient): TeamSpeakClient {
        return null;
    }
}