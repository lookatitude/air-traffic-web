import {Controller, Post, QueryParams, UseBefore} from "@tsed/common";
import {Notifications} from "../utils/notifications";
import {AuthMiddleware} from "../middlewares/auth";

@Controller("/user")
@UseBefore(AuthMiddleware)
export class UserController {
    @Post("/sendNiceFlightMessage")
    async sendNiceFlightMessage(@QueryParams("senderId") senderId: string, @QueryParams("userId") userId: string): Promise<any> {
        return Notifications.sendNiceFlightMessage(senderId, userId);
    }

    @Post("/sendNiceFlightMessageByIvaoId")
    async sendNiceFlightMessageByIvaoId(@QueryParams("senderId") senderId: string, @QueryParams("ivaoId") ivaoId: string): Promise<any> {
        return Notifications.sendNiceFlightMessageByIvaoId(senderId, ivaoId);
    }
}