import {ServerLoader, ServerSettings} from "@tsed/common";
import {GlobalMiddleware} from "./middlewares/global";
import * as Path from "path";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    acceptMimes: ["application/json"],
    port: 8181,
    mount: {
        "/api": "${rootDir}/controllers/**/*.js"
    },
    componentsScan: [
        "${rootDir}/middlewares/**/*.js"
    ]
})
export class Server extends ServerLoader {
    public static bootstrap(): Server {
        return new Server();
    }

    public $onMountingMiddlewares(): void | Promise<any> {
        const bodyParser = require("body-parser");

        this.use(bodyParser.json());

        this.use(GlobalMiddleware);

        return null;
    }

    public $onReady() {
        console.log("Server started...");
    }

    public $onServerInitError(err) {
        console.error(err);
    }
}