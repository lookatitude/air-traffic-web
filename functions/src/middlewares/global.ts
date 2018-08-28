import {IMiddleware, Middleware, Next, Request, Response} from "@tsed/common";
import * as Express from "express";

@Middleware()
export class GlobalMiddleware implements IMiddleware {
    async use(@Request() req: Express.Request, @Response() res: Express.Response, @Next() next: Express.NextFunction) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            res.status(200).end();

            return;
        }

        next();
    }
}