import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import config from './config/keys';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
