import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { RolesGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.findOne(id);
  }

  @Get('account/:accountNumber')
  async findByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.findByAccountNumber(accountNumber);
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'created user object as response',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'> }> {
    return this.usersService.login(loginDto);
  }

  @Delete(':id/soft')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  async softDelete(@Param('id') id: string): Promise<User> {
    return this.usersService.softDelete(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDto: CreateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
