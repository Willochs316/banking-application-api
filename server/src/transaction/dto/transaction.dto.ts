export class TransactionDto {
  readonly id?: string;
  readonly transactionDate: string;
  readonly fullname: string;
  readonly accountNumber: string;
  readonly type: 'deposit' | 'withdraw';
  readonly amount: number;
  readonly currency: 'NGN';
  readonly purposeOfTransaction: string;
  readonly reference: string;
}
