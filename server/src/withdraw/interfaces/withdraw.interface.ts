export interface Withdraw {
  id?: string;
  sourceAccountNumber: string;
  amount: number;
  currency: 'NGN';
  purposeOfTransaction: string;
  type: 'withdraw';
  password: string;
}
