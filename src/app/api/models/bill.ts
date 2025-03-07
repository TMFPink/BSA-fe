/* tslint:disable */
import { BillParticipant } from './bill-participant';
export interface Bill {
  all_paid?: boolean;
  created_at?: string;
  id?: string;
  participants?: Array<BillParticipant>;
  title: string;
  total_amount: string;
}
