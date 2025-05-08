/* tslint:disable */
import { BillItemFromImage } from './bill-item-from-image';
export interface BillFromImageResponse {
  billName?: string;
  category?: string;
  date?: string;
  error?: string;
  items?: Array<BillItemFromImage>;
  total_amount?: string;
}
