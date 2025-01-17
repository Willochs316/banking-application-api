import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Transactions')
@Controller('v1/user/transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  async deposit(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userId = req.user._id;
    return this.transactionService.deposit(userId, createTransactionDto.amount);
  }

  @Post('withdraw')
  async withdraw(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userId = req.user._id;
    return this.transactionService.withdraw(userId, createTransactionDto.amount);
  }

  @Post('transfer')
  async transfer(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userId = req.user._id;
    return this.transactionService.transfer(
      userId,
      createTransactionDto.fromAccount,
      createTransactionDto.toAccount,
      createTransactionDto.amount,
    );
  }
}
