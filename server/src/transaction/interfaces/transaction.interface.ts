import { Document } from 'mongoose';

export interface Transaction extends Document {
  id?: string;
  transactionType: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Balance Inquiry' | 'Statement Request';
  date: Date;
  amount: number;
  fromAccount?: string;
  toAccount?: string;
  description?: string;
  userId: string;
  status: 'Pending' | 'Completed' | 'Failed';
}
