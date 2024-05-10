import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionSchema } from './schemas/transaction.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { DepositService } from './deposit/desposit.service';
import { WithdrawService } from './withdraw/withdraw.service';
import { TransferService } from './transfer/transfer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    DepositService,
    WithdrawService,
    TransferService,
  ],
})
export class TransactionModule {}
