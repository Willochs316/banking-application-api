import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model
  ) {}

  // @desc   make transfer
  // @route  POST /transfer
  async makeTransfer(transaction: Transaction): Promise<Transaction> {
    const { sourceAccountNumber, destinationAccountNumber, amount, reason } =
      transaction;

    let session = null;

    try {
      // Start a MongoDB transaction
      session = await this.userModel.startSession();
      session.startTransaction();

      // Find the source user by accountNumber
      const sourceUser = await this.userModel
        .findOne({
          accountNumber: sourceAccountNumber,
        })
        .session(session);

      if (!sourceUser) {
        throw new NotFoundException('Source user not found');
      }

      // Update the source user's account balance
      sourceUser.accountBalance -= amount;
      await sourceUser.save({ session });

      // Find the destination user by accountNumber
      const destinationUser = await this.userModel
        .findOne({
          accountNumber: destinationAccountNumber,
        })
        .session(session);

      if (!destinationUser) {
        throw new NotFoundException('Destination user not found');
      }

      // Update the destination user's account balance
      destinationUser.accountBalance += amount;
      await destinationUser.save({ session });

      // Create a new transaction for the transfer
      const transferTransaction = new this.transactionModel({
        sourceName: `${sourceUser.firstName} ${sourceUser.lastName}`,
        source: sourceUser._id,
        sourceAccountNumber,
        destinationName: `${destinationUser.firstName} ${destinationUser.lastName}`,
        destination: destinationUser._id,
        destinationAccountNumber,
        amount,
        type: 'transfer',
        reason,
      });

      // Save the transaction to the database
      await transferTransaction.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      // Return the transaction
      return transferTransaction;
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
