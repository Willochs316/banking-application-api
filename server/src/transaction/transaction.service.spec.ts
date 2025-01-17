import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { Transaction } from './interfaces/transaction.interface';

describe('TransactionService', () => {
  let service: TransactionService;
  let userModel: Model<User>;
  let transactionModel: jest.Mocked<Model<Transaction>>;

  beforeEach(async () => {
    const mockTransactionModel = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(data), // Mock save method
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken('User'),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken('Transaction'),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    userModel = module.get<Model<User>>(getModelToken('User'));
    transactionModel = module.get(getModelToken('Transaction'));
  });

  it('should deposit an amount and return the transaction', async () => {
    const mockUser = {
      _id: 'userId123',
      initialBalance: 1000,
      save: jest.fn(),
    };

    const mockTransactionData = {
      transactionType: 'Deposit',
      amount: 500,
      userId: 'userId123',
      status: 'Completed',
    };

    jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser as any);

    const result = await service.deposit('userId123', 500);

    expect(userModel.findById).toHaveBeenCalledWith('userId123');
    expect(mockUser.save).toHaveBeenCalled();
    expect(transactionModel).toHaveBeenCalledWith(mockTransactionData);
    expect(result).toEqual(mockTransactionData);
  });
});
