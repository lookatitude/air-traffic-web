import {Updater} from "./updater";
import {TeamSpeakChannel} from "../models/team-speak-channel";
import {FirestoreCollections} from "../firebase/firestore-collections";

export class TeamSpeakUpdater extends Updater<TeamSpeakChannel> {
    constructor() {
        super("id", FirestoreCollections.teamSpeak());
    }

    public create(item: TeamSpeakChannel): TeamSpeakChannel {
        return super.create(item);
    }

    public update(item: TeamSpeakChannel, oldItem: TeamSpeakChannel): TeamSpeakChannel {
        return super.update(item, oldItem);
    }
}