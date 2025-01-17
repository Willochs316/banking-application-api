import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt-strategy';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should validate and return a user', async () => {
    const mockUser = { id: '123', name: 'John Doe', role: 'USER' };
    (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await jwtStrategy.validate(null, { id: '123', role: 'USER' });
    expect(result).toEqual(mockUser);
  });

  it('should throw an UnauthorizedException if user is not found', async () => {
    (usersService.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      jwtStrategy.validate(null, { id: '123', role: 'USER' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
