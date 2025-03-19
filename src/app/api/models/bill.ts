/* tslint:disable */
import { BillDetail } from './bill-detail';
export interface Bill {
  all_paid?: boolean;
  category?: null | string;
  details?: Array<BillDetail>;
  id?: number;
  participants?: Array<string>;
  title: string;
  total_amount: string;
}
