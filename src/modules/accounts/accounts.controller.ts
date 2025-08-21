import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { AccountsInterface } from './interface/accounts.interface';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateAccountsDto } from './dto/update-account.dto';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';

@Roles(Role.ADMIN)
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
    async create(@Req() req, @Body() data: CreateAccountsDto, @UploadedFile() file: Express.Multer.File): Promise<AccountsInterface> {
        const userId = req.user.id;
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountsService.create({ ...data, createdBy: userId, updatedBy: userId });
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Patch('update/:id')
    async update(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateAccountsDto, @UploadedFile() file: Express.Multer.File) {
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountsService.update(id, { ...data, updatedBy: req.user.id })
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.accountsService.delete(id);
    }
}
