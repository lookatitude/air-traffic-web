import {BodyParams, Controller, Post, UseBefore} from "@tsed/common";
import {Vote} from "../models/vote";
import {Survey} from "../models/survey";
import * as admin from "firebase-admin";
import {AuthMiddleware} from "../middlewares/auth";
import {InternalServerError} from "ts-httpexceptions";
import {FirestoreModel} from "../models/firestore-model";

@Controller("/survey")
@UseBefore(AuthMiddleware)
export class SurveyController {
    @Post("/vote")
    async vote(@BodyParams() vote: Vote): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            const document: FirebaseFirestore.DocumentReference = admin.firestore().collection("surveys").doc(vote.surveyId);

            admin.firestore().runTransaction((transaction) => {
                return transaction.get(document).then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        const survey: Survey = FirestoreModel.createFromDocument<Survey>(documentSnapshot);

                        for (const choice of vote.choices) {
                            if (!survey.choices) {
                                survey.choices = {};
                            }

                            if (!survey.choices[choice]) {
                                survey.choices[choice] = {};
                            }

                            survey.choices[choice][vote.userId] = true;
                        }

                        transaction.update(document, "choices", survey.choices);

                        if (!survey.voters) {
                            survey.voters = {};
                        }

                        survey.voters[vote.userId] = true;

                        transaction.update(document, "voters", survey.voters);

                        return Promise.resolve(survey);
                    }

                    return Promise.reject("document not found!");
                });
            }).then(survey => {
                resolve({surveyId: survey.documentId});
            }).catch((err) => {
                reject(new InternalServerError(err.message));
            });
        });
    }
}