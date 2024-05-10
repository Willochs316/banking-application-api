import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model
  ) {}

  // @desc   make withdrawal
  // @route  POST /withdraw
  async makeWithdrawal(transaction: Transaction): Promise<Transaction> {
    const { sourceAccountNumber, amount, reason } = transaction;

    let session = null;

    try {
      // Start a MongoDB transaction
      session = await this.userModel.startSession();
      session.startTransaction();

      // Find the source user who wants to make a deposit
      const sourceUser = await this.userModel
        .findOne({
          accountNumber: sourceAccountNumber,
        })
        .session(session);

      if (!sourceUser) {
        throw new NotFoundException('Source user not found');
      }

      // Update the source user's account balance
      sourceUser.accountBalance -= amount; // Use += to increase balance
      await sourceUser.save({ session });

      // Create a new transaction for the withdraw
      const withdrawTransaction = new this.transactionModel({
        sourceName: `${sourceUser.firstName} ${sourceUser.lastName}`,
        source: sourceUser._id,
        sourceAccountNumber,
        destinationName: `${sourceUser.firstName} ${sourceUser.lastName}`,
        destination: sourceUser._id,
        destinationAccountNumber: sourceAccountNumber,
        amount,
        type: 'withdraw',
        reason,
      });

      // Save the transaction to the database
      await withdrawTransaction.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      // Return the transaction
      return withdrawTransaction;
    } catch (error) {
      // Abort the transaction if an error occurs
      if (session) {
        await session.abortTransaction();
      }
      throw error; // Rethrow the error
    } finally {
      // End the session
      if (session) {
        session.endSession();
      }
    }
  }
}
