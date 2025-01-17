import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
class JwtAuthGuardMock {
  canActivate(context: ExecutionContext) {
    return true;
  }
}

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    deposit: jest.fn(),
    withdraw: jest.fn(),
    transfer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
        {
          provide: JwtAuthGuard,
          useClass: JwtAuthGuardMock,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deposit', () => {
    it('should call the deposit service method', async () => {
      const createTransactionDto: CreateTransactionDto = {
        transactionType: 'DEPOSIT',
        amount: 5000,
      };
      const mockResponse = { status: 'Completed', amount: 5000 };

      mockTransactionService.deposit.mockResolvedValue(mockResponse);

      const result = await controller.deposit({ user: { _id: '123' } }, createTransactionDto);
      expect(result).toEqual(mockResponse);
      expect(mockTransactionService.deposit).toHaveBeenCalledWith('123', 5000);
    });
  });

  describe('withdraw', () => {
    it('should call the withdraw service method', async () => {
      const createTransactionDto: CreateTransactionDto = {
        transactionType: 'WITHDRAWAL',
        amount: 2000,
      };
      const mockResponse = { status: 'Completed', amount: 2000 };

      mockTransactionService.withdraw.mockResolvedValue(mockResponse);

      const result = await controller.withdraw({ user: { _id: '123' } }, createTransactionDto);
      expect(result).toEqual(mockResponse);
      expect(mockTransactionService.withdraw).toHaveBeenCalledWith('123', 2000);
    });

    it('should throw an error if user does not have enough funds', async () => {
      const createTransactionDto: CreateTransactionDto = {
        transactionType: 'WITHDRAWAL',
        amount: 20000,
      };

      mockTransactionService.withdraw.mockRejectedValue(new Error('Insufficient funds'));

      try {
        await controller.withdraw({ user: { _id: '123' } }, createTransactionDto);
      } catch (e) {
        expect(e.message).toBe('Insufficient funds');
      }
    });
  });

  describe('transfer', () => {
    it('should call the transfer service method', async () => {
      const createTransactionDto: CreateTransactionDto = {
        transactionType: 'TRANSFER',
        amount: 1000,
        fromAccount: '9071723315',
        toAccount: '9071723316',
      };
      const mockResponse = { status: 'Completed', amount: 1000 };

      mockTransactionService.transfer.mockResolvedValue(mockResponse);

      const result = await controller.transfer({ user: { _id: '123' } }, createTransactionDto);
      expect(result).toEqual(mockResponse);
      expect(mockTransactionService.transfer).toHaveBeenCalledWith(
        '123',
        '9071723315',
        '9071723316',
        1000
      );
    });

    it('should throw an error if recipient is not found', async () => {
      const createTransactionDto: CreateTransactionDto = {
        transactionType: 'TRANSFER',
        amount: 1000,
        fromAccount: '9071723315',
        toAccount: '9071723316',
      };

      mockTransactionService.transfer.mockRejectedValue(new Error('Recipient not found'));

      try {
        await controller.transfer({ user: { _id: '123' } }, createTransactionDto);
      } catch (e) {
        expect(e.message).toBe('Recipient not found');
      }
    });
  });
});
