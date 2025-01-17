import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction type',
    enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'],
  })
  @IsEnum(['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'])
  @IsNotEmpty()
  @IsString()
  readonly transactionType: string;

  @ApiProperty({ description: 'Amount of the transaction', example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({
    description: 'From Account (if transferring)',
    example: '9071723315',
  })
  @IsOptional()
  @IsString()
  readonly fromAccount?: string;

  @ApiProperty({
    description: 'To Account (if transferring)',
    example: '9071723316',
  })
  @IsOptional()
  @IsString()
  readonly toAccount?: string;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'ATM withdrawal',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
