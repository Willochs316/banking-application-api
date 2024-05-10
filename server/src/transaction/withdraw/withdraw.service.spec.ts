import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { WithdrawService } from './withdraw.service';

describe('WithdrawService', () => {
  let service: WithdrawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawService,
        {
          provide: getModelToken('Transaction'),
          useValue: {},
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WithdrawService>(WithdrawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
