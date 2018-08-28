import {Aircraft} from "./aircraft";

export interface FlightPlan {
    aircraft: Aircraft;
    cruisingSpeed: string;
    departureAerodrome: string;
    cruisingLevel: string;
    destinationAerodrome: string;
    revision: string;
    flightRules: string;
    departureTime: string;
    actualDepartureTime: string;
    eet: string;
    endurance: string;
    alternateAerodrome: string;
    otherInfo: string;
    route: string;
    open: boolean;
}