import {SurveyType} from "./survey-type";
import {FirestoreModel} from "./firestore-model";

export class Survey extends FirestoreModel {
    title: string;
    content: string;
    choices: { [fieldPath: string]: { [fieldPath: string]: boolean } };
    voters: { [fieldPath: string]: boolean };
    type: SurveyType;
    active: boolean;
}