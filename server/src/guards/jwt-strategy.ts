import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { jwtSecret } from '../config/keys';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly usersService: UsersService) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      passReqToCallback: true, 
    };
    super(options);
  }

  async validate(req: Request, payload: { id: string; role: string }): Promise<User> {
    const user = await this.usersService.findOne(payload.id);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
