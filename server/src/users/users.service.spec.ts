import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;
  let jwtService: JwtService;

  const mockUserModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn().mockImplementation((createUserDto) => {
      const mockCreatedUser = {
        ...createUserDto,
        _id: '1',
        password: 'hashedpassword',
        toObject: jest.fn().mockReturnValue(createUserDto),
      };
      return mockCreatedUser;
    }),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken('User'));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const mockUsers = [
        {
          _id: '1',
          username: 'testuser1',
          password: 'hashedpass',
          email: 'test1@example.com',
        },
        {
          _id: '2',
          username: 'testuser2',
          password: 'hashedpass',
          email: 'test2@example.com',
        },
      ];
      userModel.find.mockReturnValueOnce({
        lean: jest.fn().mockResolvedValue(mockUsers),
      });

      const result = await service.findAll();
      expect(result).toEqual([
        { _id: '1', username: 'testuser1', email: 'test1@example.com' },
        { _id: '2', username: 'testuser2', email: 'test2@example.com' },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a user without password', async () => {
      const mockUser = {
        _id: '1',
        username: 'testuser',
        password: 'hashedpass',
        email: 'test@example.com',
      };
      userModel.findOne.mockReturnValueOnce({
        lean: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await service.findOne('1');
      expect(result).toEqual({
        _id: '1',
        username: 'testuser',
        email: 'test@example.com',
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      userModel.findOne.mockReturnValueOnce({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should create a new user and return it with a token', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        accountNumber: '1234567890',
        initialBalance: 500,
        password: 'password',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        postalCode: 12345,
      };

      const mockCreatedUser = {
        ...createUserDto,
        _id: '1',
        password: 'hashedpassword',
        toObject: jest.fn().mockReturnValue(createUserDto),
      };

      userModel.findOne.mockResolvedValue(null);
      userModel.create.mockReturnValue(mockCreatedUser);
      mockJwtService.sign.mockReturnValue('testtoken');

      const result = await service.createUser(createUserDto);

      expect(result).toEqual({
        user: expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          accountNumber: '1234567890',
          initialBalance: 500,
          address: '123 Main St',
          city: 'Anytown',
          state: 'Anystate', 
          postalCode: '12345', 
        }),
        token: 'testtoken',
      });
    });

    it('should throw BadRequestException if email or account number already exists', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        accountNumber: '1234567890',
        initialBalance: 500,
        password: 'password',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        postalCode: 12345,
      };

      userModel.findOne.mockResolvedValueOnce({ email: 'johndoe@example.com' });

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'password' };
      const mockUser = {
        _id: '1',
        username: 'testuser',
        password: await bcrypt.hash('password', 10),
        role: 'USER',
        isDeleted: false,
        toObject: jest
          .fn()
          .mockReturnValue({ username: 'testuser', role: 'USER' }),
      };

      userModel.findOne.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('testtoken');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: expect.objectContaining({ username: 'testuser', role: 'USER' }),
        token: 'testtoken',
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'password' };

      userModel.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };
      const mockUser = {
        _id: '1',
        username: 'testuser',
        password: await bcrypt.hash('password', 10),
        role: 'USER',
        isDeleted: false,
      };

      userModel.findOne.mockResolvedValue(mockUser);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
