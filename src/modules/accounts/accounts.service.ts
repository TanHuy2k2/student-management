import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-accounts.dto';
import { AccountInterface } from './interface/accounts.interface';
import { AccountEntity } from 'src/database/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SALT_OF_ROUND } from 'src/constants/constant';
import * as bcrypt from 'bcrypt';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountsRepository: Repository<AccountEntity>,
    ) { }

    getHello(): string {
        return 'Hello account!';
    }

    async findOne(email: string): Promise<AccountInterface | null> {
        const user = await this.accountsRepository.findOneBy({ email })
        return user;
    }

    async create(data: CreateAccountDto): Promise<AccountInterface> {
        try {
            const existed_user = await this.findOne(data.email);
            if (existed_user) {
                throw new ConflictException('Email already existed!');
            }

            const hashPassword = await bcrypt.hash(data.password, SALT_OF_ROUND);
            data.password = hashPassword;

            return await this.accountsRepository.save(data);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: UpdateAccountDto): Promise<AccountInterface> {
        try {
            const account = await this.accountsRepository.findOne({ where: { id } });
            if (!account) {
                throw new NotFoundException(`Account with id=${id} not found`);
            }

            const { image, ...rest } = data;
            const payload = data.image ? data : rest;

            return await this.accountsRepository.save({ id, ...payload });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(`Email ${data.email} already exists`);
            }
            throw error;
        }
    }

    async delete(id: number) {
        const account = await this.accountsRepository.findOne({ where: { id } });
        if (!account) {
            throw new NotFoundException(`Account with id=${id} not found`);
        }

        return await this.accountsRepository.delete({ id });
    }
}
