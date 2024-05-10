import { Document } from 'mongoose';

export interface Transaction extends Document {
  id?: string;
  sourceName: string;
  source: string;
  sourceAccountNumber: string;
  destinationName: string;
  destination: string;
  destinationAccountNumber: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'transfer';
  reason: string;
  createdAt: Date;
}
