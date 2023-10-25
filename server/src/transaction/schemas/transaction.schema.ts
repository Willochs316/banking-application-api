import * as mongoose from 'mongoose';

const CurrencyEnum = ['NGN'];

export const TransactionSchema = new mongoose.Schema(
  {
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    fullname: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdraw'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: CurrencyEnum,
      required: true,
    },
    purposeOfTransaction: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
