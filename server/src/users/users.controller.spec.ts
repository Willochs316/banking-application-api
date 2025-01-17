import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: Partial<UsersService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return all users', async () => {
    const mockUsers = [{ id: '1', name: 'John Doe' }];
    (service.findAll as jest.Mock).mockResolvedValue(mockUsers);

    const result = await controller.findAll();
    expect(result).toEqual(mockUsers);
  });

  it('should return a single user', async () => {
    const mockUser = { id: '1', name: 'John Doe' };
    (service.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockUser);
  });
});
