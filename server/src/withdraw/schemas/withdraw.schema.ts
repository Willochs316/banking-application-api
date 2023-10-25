import * as mongoose from 'mongoose';

// Define currency enum values
const CurrencyEnum = ['NGN'];

export const WithdrawSchema = new mongoose.Schema(
  {
    sourceAccountNumber: {
      type: String,
      required: [true, 'Please add a valid field'],
      unique: true,
    },
    amount: Number,
    currency: {
      type: String,
      enum: CurrencyEnum,
      required: true,
    },
    password: String,
    purposeOfTransaction: String,
    type: {
      type: String,
      enum: ['withdraw'],
      default: 'withdraw',
    },
  },
  {
    timestamps: true,
  },
);
