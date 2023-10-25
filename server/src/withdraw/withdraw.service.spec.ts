import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawService } from './withdraw.service';
import { getModelToken } from '@nestjs/mongoose';

describe('WithdrawService', () => {
  let service: WithdrawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawService,
        {
          provide: getModelToken('Withdraw'),
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
