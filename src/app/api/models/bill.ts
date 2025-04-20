/* tslint:disable */
import { BillDetail } from './bill-detail';
import { Participant } from './participant';
export interface Bill {
  billDetails: Array<BillDetail>;
  billName: string;
  category: string;
  date: string;
  id?: number;
  participants: Array<Participant>;
  payer?: string;
  shared: boolean;
  total_amount: string;
}
