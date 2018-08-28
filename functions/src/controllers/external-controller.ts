import {BodyParams, Controller, Post} from "@tsed/common";
import {TeamSpeakParam} from "../parameters/team-speak-param";
import {TeamSpeakChannel} from "../models/team-speak-channel";
import {TeamSpeakClient} from "../models/team-speak-client";
import {Clients} from "../utils/clients";
import {Client} from "../models/client";
import {IvaoUpdater} from "../updater/ivao-updater";
import {TeamSpeakUpdater} from "../updater/team-speak-updater";
import {TeamSpeakClientUpdater} from "../updater/team-speak-client-updater";

@Controller("/external")
export class ExternalController {
    private ivaoUpdater: IvaoUpdater = new IvaoUpdater();
    private teamSpeakUpdater: TeamSpeakUpdater = new TeamSpeakUpdater();

    @Post("/ivao")
    async ivao(@BodyParams("content") content: string): Promise<any> {
        const clients: Client[] = Clients.parse(content);

        return this.ivaoUpdater.insert(clients).then(value => this.ivaoUpdater.delete(clients));
    }

    @Post("/teamspeak")
    async teamspeak(@BodyParams("content") content: TeamSpeakParam): Promise<any> {
        return this.teamSpeakUpdater.insert(content.channels)
            .then(value => {
                return this.teamSpeakUpdater.delete(content.channels);
            })
            .then(value => {
                const promises: Promise<any>[] = [];

                for (let i = 0; i < content.channels.length; i++) {
                    promises.push(this.updateClients(content.channels[i], content.clients[i]));
                }

                return Promise.all(promises);
            });
    }

    private updateClients(channel: TeamSpeakChannel, clients: TeamSpeakClient[]): Promise<any> {
        const updater: TeamSpeakClientUpdater = new TeamSpeakClientUpdater(channel.id);

        for (const client of clients) {
            client.connectionTime = new Date();
        }

        return updater.insert(clients).then(value => updater.delete(clients));
    }
}