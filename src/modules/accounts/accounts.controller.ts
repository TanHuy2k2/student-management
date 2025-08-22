import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { CreateAccountDto } from './dto/create-accounts.dto';
import { AccountInterface } from './interface/accounts.interface';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';

@Roles(Role.ADMIN)
@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService,
    ) { }

    @Get()
    getHello(): string {
        return this.accountService.getHello();
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Post('create')
    async create(@Req() req, @Body() data: CreateAccountDto, @UploadedFile() file: Express.Multer.File): Promise<AccountInterface> {
        const userId = req.user.id;
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountService.create({ ...data, createdBy: userId, updatedBy: userId });
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Patch('update/:id')
    async update(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateAccountDto, @UploadedFile() file: Express.Multer.File) {
        data.image = file ? `/uploads/${file.filename}` : '';
        return this.accountService.update(id, { ...data, updatedBy: req.user.id })
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.accountService.delete(id);
    }
}
