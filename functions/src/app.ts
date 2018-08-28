import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {Server} from "./server";
import {config} from "./config";
import {configProd} from "./config-prod";
import {User} from "./models/user";
import {Notifications} from "./utils/notifications";
import env = require("env-var");

const stage = env.get("NODE_ENV").asString();

if (stage === "prod") {
    admin.initializeApp(configProd);
} else {
    admin.initializeApp(config);
}

const server = Server.bootstrap();

server.start()
    .then(() => {
        if (stage === "prod") {
            console.log("production");
        } else {
            console.log("development");
        }
    })
    .catch(() => {
        //
    });

export const api = functions.https.onRequest(server.expressApp);

export const sendWelcomeEmail = functions.auth.user().onCreate(user => {
    return Promise.resolve();
});

export const sendWelcomeMessage = functions.firestore.document("users/{userId}").onCreate(event => {
    const user: User = event.data() as User;

    return Promise.resolve().then(() => {
        return Notifications.sendWelcomeMessage(user);
    }).catch(reason => {
        //
    });
});