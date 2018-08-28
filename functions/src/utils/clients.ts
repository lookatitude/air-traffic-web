import {Client} from "../models/client";
import {ClientType} from "../models/client-type";
import {Pilot} from "../models/pilot";
import {FlightPlan} from "../models/flight-plan";
import {Aircraft} from "../models/aircraft";
import {Atc} from "../models/atc";

export class Clients {
    public static parse(content: string): Client[] {
        const result: Client[] = [];
        const rows: string[] = content.split("\n");

        let filePart: string = "";
        let fields: string[];

        for (const row of rows) {
            if (row.substring(0, 1) === "!") {
                filePart = row.substring(1);
            } else {
                switch (filePart) {
                    case "GENERAL":
                        break;
                    case "CLIENTS":
                        fields = row.split(":");

                        const client: Client = Clients.createClient(fields);

                        if (client) {
                            result.push(client);
                        }

                        break;
                }
            }
        }

        return result;
    }

    public static createClient(data: string[]): Client {
        if (data[3] === "PILOT") {
            return Clients.createPilot(data);
        } else if (data[3] === "ATC") {
            return Clients.createAtc(data);
        } else {
            return null;
        }
    }

    public static createPilot(data: string[]): Pilot {
        return {
            callsign: data[0],
            ivaoId: data[1],
            name: data[2],
            type: ClientType.Pilot,
            latitude: parseFloat(data[5]),
            longitude: parseFloat(data[6]),
            altitude: parseFloat(data[7]),
            groundSpeed: parseFloat(data[8]),
            flightPlan: Clients.createFlightPlan(data),
            server: data[14],
            protocol: data[15],
            combinedRating: data[16],
            transponderCode: data[17],
            connectionTime: Clients.convertConnectionTime(data[37]),
            softwareName: data[38],
            softwareVersion: data[39],
            administrativeVersion: data[40],
            rating: parseInt(data[41]),
            heading: parseInt(data[45]),
            onGround: (data[46] === "1"),
            simulator: parseInt(data[47]),
            plane: data[48],
            online: true
        } as Pilot;
    }

    public static createFlightPlan(data: string[]): FlightPlan {
        if (data[9]) {
            return {
                aircraft: Clients.createAircraft(data[9]),
                cruisingSpeed: data[10],
                departureAerodrome: data[11],
                cruisingLevel: data[12],
                destinationAerodrome: data[13],
                revision: data[20],
                flightRules: data[21],
                departureTime: data[22],
                actualDepartureTime: data[23],
                eet: data[24] + data[25],
                endurance: data[26] + data[27],
                alternateAerodrome: data[28],
                otherInfo: data[29],
                route: data[30],
                open: true
            };
        }

        return null;
    }

    public static createAtc(data: string[]): Atc {
        return {
            callsign: data[0],
            ivaoId: data[1],
            name: data[2],
            type: ClientType.Atc,
            frequency: data[4],
            latitude: parseFloat(data[5]),
            longitude: parseFloat(data[6]),
            altitude: parseFloat(data[7]),
            server: data[14],
            protocol: data[15],
            combinedRating: data[16],
            facilityType: data[18],
            visualRange: data[19],
            atis: data[35],
            atisTime: data[36],
            connectionTime: Clients.convertConnectionTime(data[37]),
            softwareName: data[38],
            softwareVersion: data[39],
            administrativeVersion: data[40],
            rating: parseInt(data[41]),
            online: true
        } as Atc;
    }

    public static createAircraft(data: string): Aircraft {
        const aircraft: string[] = data.split("/");

        if (data !== "") {
            return {
                type: aircraft[1],
                category: aircraft[2].split("-")[0],
                equipments: aircraft[2].split("-")[1]
            };
        }

        return null;
    }

    public static convertConnectionTime(time: string): Date {
        return new Date(parseInt(time.substring(0, 4)),
            parseInt(time.substring(4, 6)) - 1, parseInt(time.substring(6, 8)),
            parseInt(time.substring(8, 10)), parseInt(time.substring(10, 12)),
            parseInt(time.substring(12, 14)));
    }

    public static trimRoute(route: string): string {
        let result: string = "";
        const wayPoints: string[] = route.split(" ");

        for (const wayPoint of wayPoints) {
            if (wayPoint !== "") {
                result += wayPoint.trim() + " ";
            }
        }

        result = result.substring(0, result.length - 2);

        return result;
    }
}