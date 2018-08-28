import {PilotUser} from "../models/pilot-user";
import {Guest} from "../models/guest";
import {User} from "../models/user";
import {UserType} from "../models/user-type";
import {News} from "../models/news";

export class Formatter {
    public static replaceForUser(text: string, user: User): string {
        if (user.type === UserType.Pilot) {
            return Formatter.replaceForPilotUser(text, user as PilotUser);
        }

        if (user.type === UserType.Guest) {
            return Formatter.replaceForGuest(text, user as Guest);
        }

        return null;
    }

    public static replaceForPilotUser(text: string, user: PilotUser): string {
        return text.replace(/\${USER_FIRST_NAME}/g, user.firstName)
            .replace(/\${USER_LAST_NAME}/g, user.lastName);
    }

    public static replaceForGuest(text: string, user: Guest): string {
        return text.replace(/\${GUEST_DISPLAY_NAME}/g, user.displayName);
    }

    public static replaceForNews(text: string, news: News): string {
        return text.replace(/\${NEWS_TITLE}/g, news.title)
            .replace(/\${NEWS_BODY}/g, news.body);
    }
}