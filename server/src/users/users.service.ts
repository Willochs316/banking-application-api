import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userModel.find().lean();

    return users.map(({ password, ...result }) => result);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async findByAccountNumber(
    accountNumber: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findOne({ accountNumber }).lean();
    if (!user) {
      throw new NotFoundException('Account not found');
    }
    const { password, ...result } = user;

    return result;
  }

  /**
   * @desc Create a new user (register) and return a JWT token
   * @param createUserDto - Data transfer object containing user details
   * @returns The created user and JWT token
   */
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const { email, accountNumber, role } = createUserDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { accountNumber }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or account number already exists');
    }

    const assignedRole = role || Role.USER;

    // Create and save the user
    const createdUser = new this.userModel({
      ...createUserDto,
      role: assignedRole,
    });
    await createdUser.save();

    const token = this.jwtService.sign({
      id: createdUser._id,
      role: assignedRole,
    });

    const { password, ...result } = createdUser.toObject();

    return { user: result as Omit<User, 'password'>, token };
  }

  /**
   * @desc Handle user login and return JWT token.
   * @param loginDto - Login data containing username and password
   * @returns JWT token for the user
   */
  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const { username, password } = loginDto;

    // Check for user by email
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isDeleted) {
      throw new UnauthorizedException('Account is deleted');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    const { password: _, ...result } = user.toObject();

    return { user: result as Omit<User, 'password'>, token };
  }

  async softDelete(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isDeleted) {
      throw new BadRequestException('User is already deleted');
    }

    user.isDeleted = true;
    await user.save();

    return user;
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isDeleted) {
      throw new BadRequestException('Cannot update a deleted user');
    }

    Object.assign(user, updateUserDto);
    await user.save();

    return user;
  }
}
