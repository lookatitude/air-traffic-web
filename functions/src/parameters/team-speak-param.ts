import {TeamSpeakChannel} from "../models/team-speak-channel";
import {TeamSpeakClient} from "../models/team-speak-client";

export interface TeamSpeakParam {
    channels: TeamSpeakChannel[];
    clients:[TeamSpeakClient[]];
}