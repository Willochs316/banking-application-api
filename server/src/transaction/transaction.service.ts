import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model
  ) {}

  async getUserTransactions(id: string): Promise<Transaction[]> {
    try {
      // Find transactions where either source or destination is the given id
      return await this.transactionModel
        .find({ $or: [{ source: id }, { destination: id }] })
        .exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch user transactions');
    }
  }
}
