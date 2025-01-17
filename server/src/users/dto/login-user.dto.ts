import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'johndoe123' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Password', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;
}
