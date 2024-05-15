import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { DepositService } from './deposit/desposit.service';
import { WithdrawService } from './withdraw/withdraw.service';
import { TransferService } from './transfer/transfer.service';
import { Transaction } from './interfaces/transaction.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly depositService: DepositService,
    private readonly withdrawService: WithdrawService,
    private readonly transferService: TransferService,
  ) {}

  @Get(':id')
  async getUserTransactions(@Param('id') id: string): Promise<Transaction[]> {
    return this.transactionService.getUserTransactions(id);
  }

  @Post('deposit')
  async deposit(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.depositService.makeDeposit(createTransactionDto);
  }

  @Post('withdraw')
  async withdraw(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.withdrawService.makeWithdrawal(createTransactionDto);
  }

  @Post('transfer')
  async transfer(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transferService.makeTransfer(createTransactionDto);
  }
}
