import * as admin from "firebase-admin";

export const configProd = {
    projectId: 'birgen-virtual-airlines',
    databaseURL: 'https://birgen-virtual-airlines.firebaseio.com',
    credential: admin.credential.cert('service-account-key-prod.json')
};