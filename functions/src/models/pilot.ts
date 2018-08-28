import {Client} from "./client";
import {ClientType} from "./client-type";
import {FlightPlan} from "./flight-plan";

export class Pilot extends Client {
    callsign: string;
    ivaoId: string;
    name: string;
    type: ClientType;
    latitude: number;
    longitude: number;
    altitude: number;
    groundSpeed: number;
    flightPlan: FlightPlan;
    server: string;
    protocol: string;
    combinedRating: string;
    transponderCode: string;
    connectionTime: Date;
    softwareName: string;
    softwareVersion: string;
    administrativeVersion: string;
    rating: number;
    heading: number;
    onGround: boolean;
    simulator: number;
    plane: string;
    online: boolean;
}