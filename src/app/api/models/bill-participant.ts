/* tslint:disable */
import { User } from './user';
export interface BillParticipant {
  bill: number;
  id?: number;
  is_paid?: boolean;
  split_amount?: string;
  user: User;
}
