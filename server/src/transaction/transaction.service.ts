import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
  ) {}

  async deposit(userId: string, amount: number): Promise<Transaction> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.initialBalance += amount; // Increase the user's balance
    await user.save();

    const transaction = new this.transactionModel({
      transactionType: 'Deposit',
      amount,
      userId,
      status: 'Completed',
    });
    return transaction.save();
  }

  async withdraw(userId: string, amount: number): Promise<Transaction> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.initialBalance < amount) {
      throw new Error('Insufficient funds');
    }

    user.initialBalance -= amount; // Deduct the balance
    await user.save();

    const transaction = new this.transactionModel({
      transactionType: 'Withdrawal',
      amount,
      userId,
      status: 'Completed',
    });
    return transaction.save();
  }

  async transfer(
    userId: string,
    fromAccount: string,
    toAccount: string,
    amount: number,
  ): Promise<Transaction> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.initialBalance < amount) {
      throw new Error('Insufficient funds');
    }

    const toUser = await this.userModel.findOne({ accountNumber: toAccount });
    if (!toUser) {
      throw new Error('Recipient not found');
    }

    // Deduct from sender's balance
    user.initialBalance -= amount;
    await user.save();

    // Add to recipient's balance
    toUser.initialBalance += amount;
    await toUser.save();

    const transaction = new this.transactionModel({
      transactionType: 'Transfer',
      amount,
      fromAccount,
      toAccount,
      userId,
      status: 'Completed',
    });
    return transaction.save();
  }
}
