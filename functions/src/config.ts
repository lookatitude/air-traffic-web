import * as admin from "firebase-admin";

export const config = {
    projectId: 'birgen-virtual-airlines-dev',
    databaseURL: 'https://birgen-virtual-airlines-dev.firebaseio.com',
    credential: admin.credential.cert('service-account-key.json')
};