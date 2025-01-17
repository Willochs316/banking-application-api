import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: [
        'Deposit',
        'Withdrawal',
        'Transfer',
        'Balance Inquiry',
        'Statement Request',
      ],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    fromAccount: {
      type: String,
      required: false,
    },
    toAccount: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);