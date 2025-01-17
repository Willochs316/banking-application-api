import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'Username', example: 'johndoe123' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Email', example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Account number', example: '9071723315' })
  @IsNotEmpty({ message: 'Account number is required.' })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Account number must be 10 digits' })
  readonly accountNumber: string;

  @ApiProperty({ description: 'Initial balance', example: 50000 })
  @IsNotEmpty({ message: 'Initial balance is required.' })
  @IsNumber()
  @Min(0, { message: 'Initial balance cannot be negative' })
  readonly initialBalance: number;

  @ApiProperty({ description: 'Password', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  readonly password: string;

  @ApiProperty({
    description: 'Address',
    example: '549 W International Airport Rd',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'City', example: 'Lagos' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'State', example: 'Lagos' })
  @IsNotEmpty({ message: 'State is required.' })
  @IsString()
  readonly state: string;

  @ApiProperty({ description: 'Postal code', example: 10045 })
  @IsNotEmpty()
  @IsNumber()
  readonly postalCode: number;

  @ApiProperty({ description: 'User role', example: 'USER', enum: Role })
  @IsOptional()
  @IsString()
  readonly role?: Role;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;
}
