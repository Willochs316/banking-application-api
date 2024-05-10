import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransferService } from './transfer.service';


describe('TransferService', () => {
  let service: TransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferService,
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

    service = module.get<TransferService>(TransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
