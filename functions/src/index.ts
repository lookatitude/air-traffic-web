import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {Server} from "./server";
import {User} from "./models/user";
import {Notifications} from "./utils/notifications";
import {TeamSpeakClient} from "./models/team-speak-client";
import {TeamSpeakAction} from "./models/team-speak-action";
import {Client} from "./models/client";
import {ClientAction} from "./models/client-action";
import {ClientType} from "./models/client-type";
import {Pilot} from "./models/pilot";
import {FlightPlanAction} from "./models/flight-plan-action";
import {News} from "./models/news";
import {UserMessage} from "./models/user-message";
import {FirestoreCollections} from "./firebase/firestore-collections";
import {Messages} from "./utils/messages";
import {FirestoreModel} from "./models/firestore-model";

const firebaseConfig = functions.config().firebase;

//firebaseConfig.credential = admin.credential.cert("service-account-key.json");

admin.initializeApp(firebaseConfig);

const server = Server.bootstrap();

server.start().then(() => {
    //
}).catch(() => {
    //
});

export const api = functions.https.onRequest(server.expressApp);

export const sendWelcomeEmail = functions.auth.user().onCreate(user => {
    return Promise.resolve();
});

export const sendWelcomeMessage = functions.firestore.document("users/{userId}").onCreate(event => {
    const user = FirestoreModel.createFromDocument<User>(event);

    return Messages.sendWelcomeMessage(user);
});

export const sendUserMessage = functions.firestore.document("messages/{messageId}").onCreate(event => {
    const userMessage = FirestoreModel.createFromDocument<UserMessage>(event);

    return Notifications.sendUserMessage(userMessage);
});

export const sendNews = functions.firestore.document("news/{newsId}").onCreate(event => {
    const news = FirestoreModel.createFromDocument<News>(event);

    return Notifications.sendNews(news)
});

export const clientConnected = functions.firestore.document("clients/{ivaoId}").onCreate(event => {
    const client = FirestoreModel.createFromDocument<Client>(event);

    if(!client.callsign.startsWith("BGN")){
        return Promise.resolve()
    }

    return Notifications.sendClientAction(client, ClientAction.Connected);
});

export const clientDisconnected = functions.firestore.document("clients/{ivaoId}").onDelete(event => {
    const client = FirestoreModel.createFromDocument<Client>(event);

    if(!client.callsign.startsWith("BGN")){
        return Promise.resolve()
    }

    return Notifications.sendClientAction(client, ClientAction.Disconnected);
});

export const clientUpdated = functions.firestore.document("clients/{ivaoId}").onUpdate(event => {
    const oldClient = FirestoreModel.createFromDocument<Client>(event.before);
    const newClient = FirestoreModel.createFromDocument<Client>(event.after);

    if(!oldClient.callsign.startsWith("BGN") || !newClient.callsign.startsWith("BGN")){
        return Promise.resolve()
    }

    if (oldClient && newClient) {
        if (oldClient.type === ClientType.Pilot && newClient.type === ClientType.Pilot) {
            const oldPilot = oldClient as Pilot;
            const newPilot = newClient as Pilot;

            if (!oldPilot.flightPlan && newPilot.flightPlan) {
                return Notifications.sendFlightPlanAction(newPilot, FlightPlanAction.Created);
            }

            if (oldPilot.flightPlan && !newPilot.flightPlan) {
                return Notifications.sendFlightPlanAction(newPilot, FlightPlanAction.Closed);
            }
        }
    }

    return Promise.resolve();
});

export const teamSpeakConnected = functions.firestore.document(FirestoreCollections.TeamSpeak.concat("/{channelId}/clients/{clientId}")).onCreate(event => {
    const client = FirestoreModel.createFromDocument<TeamSpeakClient>(event);

    return Notifications.sendTeamSpeakAction(client, TeamSpeakAction.Connected);
});

export const teamSpeakDisconnected = functions.firestore.document(FirestoreCollections.TeamSpeak.concat("/{channelId}/clients/{clientId}")).onDelete(event => {
    const client = FirestoreModel.createFromDocument<TeamSpeakClient>(event);

    return Notifications.sendTeamSpeakAction(client, TeamSpeakAction.Disconnected);
});