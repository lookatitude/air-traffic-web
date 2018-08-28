import {Client} from "./client";
import {ClientType} from "./client-type";

export class Atc extends Client {
    callsign: string;
    ivaoId: string;
    name: string;
    type: ClientType;
    frequency: string;
    latitude: number;
    longitude: number;
    altitude: number;
    server: string;
    protocol: string;
    combinedRating: string;
    facilityType: string;
    visualRange: string;
    atis: string;
    atisTime: string;
    connectionTime: Date;
    softwareName: string;
    softwareVersion: string;
    administrativeVersion: string;
    rating: number;
    online: boolean;
}