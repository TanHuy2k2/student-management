import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../accounts/accounts.module';
import { RoomEntity } from 'src/database/entities/room.entity';

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([RoomEntity])
    ],
    controllers: [RoomController],
    providers: [RoomService],
})
export class RoomModule { }
