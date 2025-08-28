import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Roles(Role.ADMIN)
@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService
    ) { }

    @Get()
    find() {
        return this.roomService.find();
    }

    @Post('create')
    create(@Req() req, @Body() data: CreateRoomDto) {
        const userId = req.user.id;
        return this.roomService.create({ ...data, createdBy: userId, updatedBy: userId });
    }

    @Patch('update/:id')
    update(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateRoomDto) {
        return this.roomService.update(id, { ...data, updatedBy: req.user.id });
    }

    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.delete(id);
    }
}
