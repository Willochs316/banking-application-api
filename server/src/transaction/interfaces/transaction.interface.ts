export class Transaction {
  id?: string;
  transactionDate: string;
  fullname: string;
  accountNumber: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  currency: 'NGN';
  purposeOfTransaction: string;
  reference: string;
}
