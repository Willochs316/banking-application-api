import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Deposit } from './interfaces/deposit.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel('Deposit') private readonly depositModel: Model<Deposit>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model
  ) {}

  async findAll(): Promise<Deposit[]> {
    return await this.depositModel.find();
  }

  async findOne(id: string): Promise<Deposit> {
    return await this.depositModel.findOne({ _id: id });
  }

  async createDeposit(deposit: Deposit): Promise<Deposit> {
    const {
      sourceAccountNumber,
      recipientAccountNumber,
      amount,
      type,
      currency,
      purposeOfTransaction,
      password,
    } = deposit;

    if (deposit.amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    // Check if the source and recipient account numbers (phone numbers) exist in your user database
    const sourceUser = await this.findUserByPhoneNumber(sourceAccountNumber);
    const recipientUser = await this.findUserByPhoneNumber(
      recipientAccountNumber,
    );

    // Generate a unique reference ID
    const reference = this.generateReference();

    if (!sourceUser || !recipientUser) {
      throw new NotFoundException('Invalid source or recipient account number');
    }

    // Check if the source and recipient are the same user
    if (sourceUser.phoneNumber === recipientUser.phoneNumber) {
      // Deposit money into the user's own account
      sourceUser.accountBalance += amount;
      // Update the user's account balance in the database
      await this.userModel
        .findOneAndUpdate(
          { phoneNumber: sourceAccountNumber },
          { accountBalance: sourceUser.accountBalance },
        )
        .exec();
    } else {
      // Check if the source account has sufficient balance
      if (sourceUser.accountBalance < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      // Perform the deposit transaction
      sourceUser.accountBalance -= amount; // Deduct the amount from the sourceUser
      recipientUser.accountBalance += amount; // Add the amount to the recipientUser

      // Update source and recipient accounts in the database
      await this.userModel
        .findOneAndUpdate(
          { phoneNumber: sourceAccountNumber },
          { accountBalance: sourceUser.accountBalance },
        )
        .exec();

      await this.userModel
        .findOneAndUpdate(
          { phoneNumber: recipientAccountNumber },
          { accountBalance: recipientUser.accountBalance },
        )
        .exec();
    }

    // Fetch sender and recipient names from the User model
    const senderName = sourceUser.fullname;
    const recipientName = recipientUser.fullname;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the deposit record with sender and recipient names
    const newDeposit = new this.depositModel({
      ...deposit,
      senderName,
      recipientName,
      type,
      currency,
      purposeOfTransaction,
      password: hashedPassword,
      reference,
    });

    // Save the deposit record
    await newDeposit.save();
    return newDeposit;
  }

  private async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userModel.findOne({ phoneNumber });
  }

  // Generate a unique reference ID
  private generateReference(): string {
    // Implement your logic to generate a unique reference ID (e.g., using a combination of timestamp and random characters)
    const timestamp = Date.now().toString();
    const randomChars = Math.random().toString(36).substring(2, 8);
    return `${timestamp}${randomChars}`;
  }

  async delete(id: string): Promise<Deposit> {
    return await this.depositModel.findByIdAndRemove(id);
  }
}
