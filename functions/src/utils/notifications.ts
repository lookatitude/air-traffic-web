import * as admin from "firebase-admin";
import {Client} from "../models/client";
import {Pilot} from "../models/pilot";
import {TopicType} from "../models/topic-type";
import {User} from "../models/user";
import {PilotUser} from "../models/pilot-user";
import {TeamSpeakAction} from "../models/team-speak-action";
import {FlightPlanAction} from "../models/flight-plan-action";
import {ClientAction} from "../models/client-action";
import {TeamSpeakClient} from "../models/team-speak-client";
import {MessageTemplate} from "../models/message-template";
import {Formatter} from "./formatter";
import {NotificationClickAction} from "../core/notification-click-action";
import {NotificationExtra} from "../models/notification-extra";
import {MessageTemplateType} from "../models/message-template-type";
import {News} from "../models/news";
import {UserMessage} from "../models/user-message";
import {FirestoreCollections} from "../firebase/firestore-collections";
import {UserType} from "../models/user-type";
import Message = admin.messaging.Message;
import FieldValue = admin.firestore.FieldValue;

export class Notifications {
    public static sendWelcomeMessage(user: User): Promise<object> {
        return MessageTemplate.getTemplateByType("WELCOME_" + user.type.toString())
            .then(template => {
                if (template === null || !template.enabled) {
                    return null;
                }

                const message: Message = {
                    android: {
                        ttl: 10800 * 1000, // 3 hours in milliseconds
                        collapseKey: "welcome_message",
                        notification: {
                            tag: new Date().getTime().toString()
                        }
                    },
                    notification: {
                        title: Formatter.replaceForUser(template.title, user),
                        body: Formatter.replaceForUser(template.body, user)
                    },
                    token: user.fcmToken
                };

                const userMessage = {
                    subject: Formatter.replaceForUser(template.title, user),
                    body: Formatter.replaceForUser(template.body, user),
                    from: null,
                    to: user.userId,
                    read: false,
                    createdAt: FieldValue.serverTimestamp()
                };

                return admin.messaging()
                    .send(message)
                    .then(() => admin.firestore()
                        .collection(FirestoreCollections.Messages)
                        .add(userMessage)
                    )
            });
    }

    public static sendUserMessage(userMessage: UserMessage): Promise<string> {
        return User.getUserById(userMessage.to)
            .then(user => {
                if (user.type === UserType.Pilot) {
                    return Notifications.sendPilotMessage(user, userMessage)
                }

                return Notifications.sendGuestMessage(user, userMessage)
            })
    }

    public static sendPilotMessage(user: User, userMessage: UserMessage): Promise<string> {
        return PilotUser.getUserById(userMessage.from)
            .then(from => {
                const titleLocKey = from !== null ? null : "fcm_system_message";
                const fromName = from !== null ? from.firstName : "System Message";
                const data: { [key: string]: string } = {};

                data[NotificationExtra.MessageId] = userMessage.documentId;

                const message: Message = {
                    android: {
                        ttl: 10800 * 1000, // 3 hours in milliseconds
                        collapseKey: "user_message",
                        notification: {
                            tag: new Date().getTime().toString(),
                            titleLocKey: titleLocKey,
                            clickAction: NotificationClickAction.ShowMessage.toString()
                        }
                    },
                    notification: {
                        title: fromName,
                        body: userMessage.subject
                    },
                    data: data,
                    token: user.fcmToken
                };

                return admin.messaging().send(message);
            });
    }

    public static sendGuestMessage(user: User, userMessage: UserMessage): Promise<string> {
        return PilotUser.getUserById(userMessage.from)
            .then(from => {
                const titleLocKey = from !== null ? null : "fcm_system_message";
                const fromName = from !== null ? from.firstName : "System Message";
                const data: { [key: string]: string } = {};

                data[NotificationExtra.MessageId] = userMessage.documentId;

                const message: Message = {
                    android: {
                        ttl: 10800 * 1000, // 3 hours in milliseconds
                        collapseKey: "user_message",
                        notification: {
                            tag: new Date().getTime().toString(),
                            titleLocKey: titleLocKey,
                            clickAction: NotificationClickAction.ShowMessage.toString()
                        }
                    },
                    notification: {
                        title: fromName,
                        body: userMessage.subject
                    },
                    data: data,
                    token: user.fcmToken
                };

                return admin.messaging().send(message);
            });
    }

    public static sendNews(news: News): Promise<string> {
        return MessageTemplate.getTemplateByType(MessageTemplateType.News.toString())
            .then(template => {
                if (template === null || !template.enabled) {
                    return null;
                }

                const message: Message = {
                    android: {
                        ttl: 10800 * 1000, // 3 hours in milliseconds
                        collapseKey: "news",
                        notification: {
                            tag: new Date().getTime().toString()
                        }
                    },
                    notification: {
                        title: Formatter.replaceForNews(template.title, news),
                        body: Formatter.replaceForNews(template.body, news)
                    },
                    topic: TopicType.News.toString()
                };

                return admin.messaging().send(message);
            });
    }

    public static sendNiceFlightMessage(senderId: string, userId: string): Promise<any> {
        return MessageTemplate.getTemplateByType(MessageTemplateType.NiceFlight.toString())
            .then(template => {
                if (template === null || !template.enabled) {
                    return null;
                }

                return Promise.all([Promise.resolve(template), User.getUserById(senderId), User.getUserById(userId)]);
            })
            .then(values => {
                const title = Formatter.replaceForUser(values[0].title, values[1]);
                const body = Formatter.replaceForUser(values[0].body, values[1]);

                const message: Message = {
                    android: {
                        ttl: 0,
                        collapseKey: "nice_flight",
                        notification: {
                            tag: new Date().getTime().toString()
                        }
                    },
                    notification: {
                        title: title,
                        body: body
                    },
                    token: values[2].fcmToken
                };

                return admin.messaging().send(message);
            })
            .then(value => {
                return {messageId: value};
            });
    }

    public static sendNiceFlightMessageByIvaoId(senderId: string, ivaoId: string): Promise<any> {
        return MessageTemplate.getTemplateByType(MessageTemplateType.NiceFlight.toString())
            .then(template => {
                if (template === null || !template.enabled) {
                    return Promise.reject("template not found");
                }

                return Promise.all([Promise.resolve(template), User.getUserById(senderId), PilotUser.getUserByIvaoId(ivaoId)]);
            })
            .then(values => {
                const title = Formatter.replaceForUser(values[0].title, values[1]);
                const body = Formatter.replaceForUser(values[0].body, values[1]);

                const message: Message = {
                    android: {
                        ttl: 0,
                        collapseKey: "nice_flight",
                        notification: {
                            tag: new Date().getTime().toString()
                        }
                    },
                    notification: {
                        title: title,
                        body: body
                    },
                    token: values[2].fcmToken
                };

                return admin.messaging().send(message);
            })
            .then(value => {
                return {messageId: value};
            });
    }

    public static sendClientAction(client: Client, action: ClientAction): Promise<string> {
        return PilotUser.getUserByIvaoId(client.ivaoId)
            .then(user => {
                let title = "";

                if (user) {
                    title = user.firstName + " (" + user.callsign + ")";
                } else {
                    title = client.callsign;
                }

                const bodyLocKey = "fcm_" + client.type.toString().toLowerCase() + "_" + action.toString().toLowerCase();
                const topic = TopicType.ClientActions;

                const message: Message = {
                    android: {
                        ttl: 0,
                        collapseKey: "client_action",
                        notification: {
                            tag: new Date().getTime().toString(),
                            bodyLocKey: bodyLocKey
                        }
                    },
                    notification: {
                        title: title
                    },
                    topic: topic.toString()
                };

                return admin.messaging().send(message);
            });
    }

    public static sendFlightPlanAction(pilot: Pilot, action: FlightPlanAction): Promise<string> {
        return PilotUser.getUserByIvaoId(pilot.ivaoId)
            .then(user => {
                let title = "";

                if (user) {
                    title = user.firstName + " (" + user.callsign + ")";
                } else {
                    title = pilot.callsign;
                }

                const bodyLocKey = "fcm_flight_plan_" + action.toString().toLowerCase();
                const topic = TopicType.FlightPlanActions;
                const data: { [key: string]: string } = {};

                data[NotificationExtra.IvaoId] = pilot.ivaoId;

                const message: Message = {
                    android: {
                        ttl: 0,
                        collapseKey: "flight_plan_action",
                        notification: {
                            tag: new Date().getTime().toString(),
                            bodyLocKey: bodyLocKey
                        }
                    },
                    notification: {
                        title: title
                    },
                    data: data,
                    topic: topic.toString()
                };

                if (action === FlightPlanAction.Created) {
                    if (pilot.flightPlan.departureAerodrome === null || pilot.flightPlan.departureAerodrome === "" || pilot.flightPlan.destinationAerodrome === null || pilot.flightPlan.destinationAerodrome === "") {
                        return Promise.reject("the flight plan is invalid");
                    }

                    message.android.notification.clickAction = NotificationClickAction.ShowFlight.toString();
                    message.android.notification.bodyLocArgs = [pilot.flightPlan.departureAerodrome, pilot.flightPlan.destinationAerodrome];
                }

                return admin.messaging().send(message);
            });
    }

    public static sendTeamSpeakAction(client: TeamSpeakClient, action: TeamSpeakAction): Promise<string> {
        const title = client.name;
        const bodyLocKey = "fcm_team_speak_client_" + action.toString().toLowerCase();
        const topic = TopicType.TeamSpeakActions;

        const message: Message = {
            android: {
                ttl: 0,
                collapseKey: "team_speak_action",
                notification: {
                    tag: new Date().getTime().toString(),
                    bodyLocKey: bodyLocKey
                }
            },
            notification: {
                title: title
            },
            topic: topic.toString()
        };

        return admin.messaging().send(message);
    }

    //FIXME
    /*public static replaceClientData(text: string, client: Client): string {
        return text.replace(/\${CLIENT_NAME}/g, client.name);
    }

    public static replaceTeamSpeakClientData(text: string, clientName: string): string {
        return text.replace(/\${CLIENT_NAME}/g, clientName);
    }

    public static replaceClientData(text: string, client: Client): string {
        const values: RegExpMatchArray = MultiLanguage.getLanguages(text);
        let result: string = "";

        for (const index in values) {
            const value = values[index];
            const code = MultiLanguage.getLanguageCode(value);

            result += value.replace(/\${CLIENT_NAME}/g, client.name);
        }

        return result;
    }

    public static replaceTeamSpeakClientData(text: string, clientName: string): string {
        const values: RegExpMatchArray = MultiLanguage.getLanguages(text);
        let result: string = "";

        for (const index in values) {
            const value = values[index];
            const code = MultiLanguage.getLanguageCode(value);

            result += value.replace(/\${CLIENT_NAME}/g, clientName);
        }

        return result;
    }*/
}