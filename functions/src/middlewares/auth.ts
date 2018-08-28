import {IMiddleware, Middleware, Next, Request, Response} from "@tsed/common";
import {Forbidden} from "ts-httpexceptions";
import * as Express from "express";
import * as admin from "firebase-admin";

@Middleware()
export class AuthMiddleware implements IMiddleware {
    async use(@Request() req: Express.Request, @Response() res: Express.Response, @Next() next: Express.NextFunction) {
        try {
            const authorization = req.headers.authorization;

            if (authorization !== null) {
                const decodedUserToken = await admin.auth().verifyIdToken(authorization);

                if (decodedUserToken !== null) {
                    res.header("userId", decodedUserToken.uid);

                    next();

                    return;
                }
            }

            throw new Forbidden("Oturum açmanız gerekli!");
        } catch (e) {
            throw new Forbidden("Bu alana giriş yetkiniz yok!");
        }
    }
}