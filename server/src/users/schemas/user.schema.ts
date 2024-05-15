import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    accountNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression for a valid phone number
          return /^\d{10}$/g.test(value);
        },
        message: 'Account number must be a valid phone number (10 digits).',
      },
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    initialBalance: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: 'Initial balance must be a positive number.',
      },
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    pin: {
      type: String,
      required: [true, 'Please add a pin'],
    },
    address: String,
    city: String,
    state: String,
    postalCode: Number,
  },
  {
    timestamps: true, // Add timestamps to the schema
  },
);
