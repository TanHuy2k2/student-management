import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { AccountsInterface } from './interface/accounts.interface';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateAccountsDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(
        private accountsService: AccountsService,
    ) { }

    @Get()
    getHello(): string {
        return this.accountsService.getHello();
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Post('create')
    async create(@Body() data: CreateAccountsDto, @UploadedFile() file: Express.Multer.File): Promise<AccountsInterface> {
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountsService.create(data);
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Patch('update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateAccountsDto, @UploadedFile() file: Express.Multer.File) {
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountsService.update(id, data)
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.accountsService.delete(id);
    }
}
