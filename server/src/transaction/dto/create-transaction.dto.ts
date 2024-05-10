import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto extends Document {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly sourceName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly source: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly sourceAccountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destinationName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destination: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destinationAccountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ enum: ['deposit', 'withdraw', 'transfer'] })
  @IsNotEmpty()
  @IsString()
  readonly type: 'deposit' | 'withdraw' | 'transfer';

  @ApiProperty()
  @IsString()
  readonly reason: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;
}
