import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/database/entities/room.entity';
import { Repository } from 'typeorm';
import { RoomInterface } from './interface/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private roomRepository: Repository<RoomEntity>,
    ) { }

    async find(): Promise<RoomInterface[]> {
        return await this.roomRepository.find();
    }

    async findByName(roomName: string): Promise<RoomInterface | null> {
        return await this.roomRepository.findOneBy({ name: roomName });
    }

    async findById(id: number): Promise<RoomInterface | null> {
        return await this.roomRepository.findOneBy({ id });
    }

    async create(data: CreateRoomDto): Promise<RoomInterface> {
        try {
            const room = await this.findByName(data.name);
            if (room) {
                throw new ConflictException(`This room name already exists!`);
            }
            return await this.roomRepository.save(data);
        } catch (error) {
            throw error
        }
    }

    async update(id: number, data: UpdateRoomDto): Promise<RoomInterface> {
        try {
            const roomById = await this.findById(id);
            if (!roomById) {
                throw new NotFoundException(`No have room with id = ${id}`);
            }

            const roomByName = await this.findByName(data.name);
            if (roomByName) {
                throw new ConflictException(`This room name already exists!`);
            }
            return await this.roomRepository.save({ id, ...data });
        } catch (error) {
            throw error
        }
    }

    async delete(id: number) {
        try {
            const roomById = await this.findById(id);
            if (!roomById) {
                throw new NotFoundException(`No have room with id = ${id}`);
            }
            return await this.roomRepository.delete(id);
        } catch (error) {
            throw error
        }
    }
}
