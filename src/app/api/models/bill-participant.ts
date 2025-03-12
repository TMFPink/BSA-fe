/* tslint:disable */
import { User } from './user';
export interface BillParticipant {
  amount_owed: string;
  is_paid?: boolean;
  user: User;
}
