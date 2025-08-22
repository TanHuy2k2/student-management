import { Module } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [TypeOrmModule, AccountService]
})

export class AccountModule { }
