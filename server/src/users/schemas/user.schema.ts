import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../../roles/role.enum';

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
    username: {
      type: String,
      required: [true, 'Please add user name'],
      unique: true,
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
        validator: function (value: string) {
          return /^\d{10}$/g.test(value);
        },
        message: 'Account number must be a valid phone number (10 digits).',
      },
    },
    initialBalance: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: 'Initial balance must be a positive number.',
      },
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    address: String,
    city: String,
    state: String,
    postalCode: Number,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});
