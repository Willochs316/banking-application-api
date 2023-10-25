import * as mongoose from 'mongoose';

const CurrencyEnum = ['NGN'];

export const DepositSchema = new mongoose.Schema(
  {
    sourceAccountNumber: {
      type: String,
      required: [true, 'Please add a value to this field'],
      unique: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recipientAccountNumber: {
      type: String,
      required: [true, 'Please add a value to this field'],
      unique: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit'],
      default: 'deposit',
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
    password: {
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
