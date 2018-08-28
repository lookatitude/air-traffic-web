import {Controller, Post, UseBefore} from "@tsed/common/lib/mvc/decorators";
import {BodyParams} from "@tsed/common";
import * as admin from "firebase-admin";
import Message = admin.messaging.Message;
import {AuthMiddleware} from "../middlewares/auth";

@Controller("/notification")
@UseBefore(AuthMiddleware)
export class NotificationController {
    @Post("/send")
    async send(@BodyParams() message: Message): Promise<any> {
        return admin.messaging().send(message)
            .then(() => {
                return Promise.resolve({status: 'success'});
            });
    }
}