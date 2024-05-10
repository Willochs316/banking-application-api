import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DepositService } from './desposit.service';

describe('DepositService', () => {
  let service: DepositService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositService,
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

    service = module.get<DepositService>(DepositService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
