export class MultiLanguage {
    public static getLanguages(text: string): RegExpMatchArray {
        return text.match(/<([\w]+)[^>]*>(.*?)<\/\1>/g);
    }

    public static getPlainText(text: string): string {
        return /(?=>)?(\w[^>]+?)(?=<)/.exec(text)[0];
    }

    public static getLanguageCode(text: string): string {
        return /(?=<)?..(?=>)/.exec(text)[0];
    }
}