export class CollectionUtil {
    public static contains<T>(collection: Array<T>, target: T, ...propertyNames: string[]): boolean {
        for (const item of collection) {
            let exists: boolean = true;

            for (const propertyName of propertyNames) {
                if (item[propertyName] !== target[propertyName]) {
                    exists = false;
                    break;
                }
            }

            if (exists) {
                return true;
            }
        }

        return false;
    }

    public static get<T>(collection: Array<T>, target: T, ...propertyNames: string[]): T {
        for (const item of collection) {
            let exists: boolean = true;

            for (const propertyName of propertyNames) {
                if (item[propertyName] !== target[propertyName]) {
                    exists = false;
                    break;
                }
            }

            if (exists) {
                return item;
            }
        }

        return null;
    }
}