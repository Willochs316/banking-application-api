import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deposit } from 'src/deposit/interfaces/deposit.interface';
import { Withdraw } from 'src/withdraw/interfaces/withdraw.interface';
import { User } from 'src/users/interfaces/user.interface';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Deposit') private readonly depositModel: Model<Deposit>,
    @InjectModel('Withdraw') private readonly withdrawModel: Model<Withdraw>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  // async getWithdrawTransactionsByUser(
  //   phoneNumber: string,
  // ): Promise<Withdraw[]> {
  //   const user = await this.findUserByPhoneNumber(phoneNumber);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const withdrawTransactions = await this.withdrawModel
  //     .find({ accountNumber: phoneNumber })
  //     .exec();

  //   return withdrawTransactions;
  // }

  private async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userModel.findOne({ phoneNumber }).exec();
  }
}
