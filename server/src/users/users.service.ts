import { Model } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './interfaces/user.interface';
import { jwtSecret } from '../config/keys';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByAccountNumber(accountNumber: string): Promise<User> {
    const user = await this.userModel.findOne({ accountNumber });
    if (!user) {
      throw new NotFoundException('Account not found');
    }
    return user;
  }

  // @desc   Register new user
  // @route  POST /users
  async signup(user: User): Promise<{ user: User; token: string }> {
    const {
      firstName,
      lastName,
      email,
      accountNumber,
      initialBalance,
      password,
      pin,
      address,
      city,
      state,
      postalCode,
    } = user;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !accountNumber ||
      initialBalance < 0 ||
      !password ||
      !pin ||
      !address ||
      !city ||
      !state ||
      !postalCode
    ) {
      if (initialBalance < 0) {
        throw new BadRequestException('Initial balance must be positive');
      }
      throw new BadRequestException('Please add all fields');
    }

    // Check if account number is a valid phone number
    if (!/^\d{10}$/g.test(accountNumber)) {
      throw new BadRequestException(
        'Account number must be a valid phone number (10 digits).',
      );
    }

    // Check if email or accountNumber already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { accountNumber }],
    });

    if (existingUser) {
      throw new ConflictException('Email or account number already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Hash PIN number with salt
    const hashedPin = await bcrypt.hash(pin, salt);

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
      pin: hashedPin,
      accountBalance: initialBalance || 0,
    });

    // Remove initialBalance property from newUser
    delete newUser['initialBalance'];

    const savedUser = await newUser.save();

    // Generate a JWT token for the newly registered user
    const token = this.generateJwtToken(savedUser.id);

    return {
      user: savedUser,
      token,
    };
  }

  // @desc   Authenticate a user
  // @route  POST /users
  async login(user: User): Promise<{ user: User; token: string }> {
    const { email, password } = user;

    // Validate input data
    if (!email || !password) {
      throw new UnauthorizedException('Invalid input data');
    }

    // Check for user by email
    const foundUser = await this.userModel.findOne({ email });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      // Generate a JWT token
      const token = this.generateJwtToken(foundUser.id);
      return {
        user: foundUser,
        token,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private generateJwtToken(id): string {
    const token = jwt.sign({ _id: id }, jwtSecret, {
      expiresIn: '1h',
    });
    return token;
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
