import {User} from './user';

export interface PilotUser extends User {
  firstName: string;
  lastName: string;
  callsign: string;
  ivaoId: string;
  email: string;
}
