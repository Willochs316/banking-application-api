import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  sourceName: {
    type: String,
    required: true,
  },
  source: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId for reference to user
    ref: 'User',
    required: true,
  },
  sourceAccountNumber: {
    type: String, // Account number for quick reference
    required: true,
  },
  destinationName: {
    type: String,
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId for reference to user
    ref: 'User',
    required: true,
  },
  destinationAccountNumber: {
    type: String, // Account number for quick reference
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw', 'transfer'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: [true, 'Please add a PIN'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
