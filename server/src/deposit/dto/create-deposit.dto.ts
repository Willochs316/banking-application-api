export class CreateDepositDto {
  readonly sourceAccountNumber: string;
  readonly senderName: string;
  readonly recipientAccountNumber: string;
  readonly recipientName: string;
  readonly accountBalance: string;
  readonly type: 'deposit';
  readonly amount: number;
  readonly currency: 'NGN';
  readonly purposeOfTransaction: string;
  readonly password: string;
  readonly reference: string;
}
