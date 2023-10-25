import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // find one user
  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.usersService.findOne(id);
  }

  // Find a user by phone number
  @Get('account/:phoneNumber')
  findByPhoneNumber(@Param('phoneNumber') phoneNumber): Promise<User> {
    return this.usersService.findByPhoneNumber(phoneNumber);
  }

  // register a user
  @Post('signup')
  @ApiCreatedResponse({
    description: 'created user object as response',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.usersService.signup(createUserDto);
  }

  // login a user
  @Post('login')
  loginUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.usersService.login(createUserDto);
  }

  // Delete a user
  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(
    @Body() updateUserDto: CreateUserDto,
    @Param('id') id,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
