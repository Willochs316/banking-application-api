import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'Email', example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Account number', example: '+2349078745647' })
  @IsNotEmpty()
  @IsString()
  readonly accountNumber: string;

  @ApiProperty({ description: 'Account balance', example: 50000 })
  @IsNotEmpty()
  @IsNumber()
  readonly accountBalance: number;

  @ApiProperty({ description: 'Initial balance', example: 50000 })
  @IsNotEmpty()
  @IsNumber()
  readonly initialBalance: number;

  @ApiProperty({ description: 'Password', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ description: 'Address', example: '48102 Mayer Harbor' })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'City', example: 'Lagos' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'State', example: 'Lagos' })
  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @ApiProperty({ description: 'Postal code', example: 12345 })
  @IsNotEmpty()
  @IsNumber()
  readonly postalCode: number;
}
