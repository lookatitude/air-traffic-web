import * as admin from "firebase-admin";
import {Controller, Get, Post} from "@tsed/common";
import {InternalServerError} from "ts-httpexceptions";
import {FirestoreCollections} from "../firebase/firestore-collections";
import {Notifications} from "../utils/notifications";
import {Pilot} from "../models/pilot";
import {FlightPlanAction} from "../models/flight-plan-action";
import FieldValue = admin.firestore.FieldValue;

@Controller("/")
export class HomeController {
    @Get("/sendTestNotification")
    async sendTestNotification(): Promise<string> {
        return Pilot.getAll<Pilot>(FirestoreCollections.clients())
            .then(pilots => {
                const pilot = pilots.find(x => x.flightPlan !== null);

                return Notifications.sendFlightPlanAction(pilot, FlightPlanAction.Created)
            });
    }

    @Get("/sendTestMessage")
    async sendTestMessage(): Promise<string> {
        const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ipsum a tortor tincidunt porttitor vel at nisl. Sed sed dictum eros, eu euismod nisi. Curabitur purus justo, blandit vel nulla eu, ultricies facilisis eros. Praesent efficitur vulputate urna at rutrum. Fusce non felis et risus ornare lobortis. Suspendisse ut elementum velit. Praesent libero justo, euismod eget consequat at, convallis ut dolor.\n" +
            "\n" +
            "Nunc auctor tincidunt ullamcorper. Maecenas ac consectetur tellus. Fusce ornare lectus risus, in sodales sem blandit et. Quisque imperdiet, mauris sit amet ornare hendrerit, dui eros elementum libero, sit amet ultrices ex dui sit amet ante. Donec pellentesque auctor neque, sed facilisis velit. Praesent sed arcu vehicula massa iaculis vehicula. Nam eu aliquam ipsum. Phasellus dolor enim, posuere in tempus ut, volutpat at sem. Etiam ac turpis est. Etiam hendrerit neque sed velit congue hendrerit.";

        const userMessage = {
            subject: text,
            body: text,
            from: "SYiNk3TpOzQzzP2YtSHPb3th1Wx1",
            to: "SYiNk3TpOzQzzP2YtSHPb3th1Wx1",
            read: false,
            createdAt: FieldValue.serverTimestamp()
        };

        admin.firestore()
            .collection(FirestoreCollections.Messages)
            .add(userMessage);

        return "ok"
    }

    @Get("/ping")
    ping(): Date {
        return new Date();
    }

    @Post("/ping")
    pingPost(): Date {
        return new Date();
    }

    @Get("/status")
    async status(): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function) => {
            admin.firestore()
                .doc("settings/status")
                .get()
                .then((doc) => {
                    const server = doc.data();

                    resolve(server);
                }).catch((err) => {
                reject(new InternalServerError(err.message));
            });
        });
    }

    @Post("/status")
    async statusPost(): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function) => {
            admin.firestore()
                .doc("settings/status")
                .get()
                .then((doc) => {
                    const server = doc.data();

                    resolve(server);
                }).catch((err) => {
                reject(new InternalServerError(err.message));
            });
        });
    }

    /*@Get("/sendTestMail")
    async sendTestMail(): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function) => {
            MailerService.sendDeveloperMail("Test", "This is test message.")
                .then(() => {
                    return resolve("mail sent successfully");
                })
                .catch(err => {
                    return reject(new InternalServerError(err));
                });
        });
    }

    @Post("/sendTestMail")
    async sendTestMailPost(): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function) => {
            MailerService.sendDeveloperMail("Test", "This is test message.")
                .then(() => {
                    return resolve("mail sent successfully");
                })
                .catch(err => {
                    return reject(new InternalServerError(err));
                });
        });
    }*/
}