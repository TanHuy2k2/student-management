import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from 'src/database/entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountsEntity])],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [TypeOrmModule, AccountsService]
})

export class AccountsModule { }
