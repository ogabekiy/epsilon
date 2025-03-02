import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomModel :typeof Room){}

  async create(createRoomDto: CreateRoomDto) {

    const data = await this.roomModel.findOne({where: {title: createRoomDto.title}})
    if(data){
          throw new ConflictException(`${createRoomDto.title} nomli categoriya o'zi mavjud`)
        }

    return  await this.roomModel.create(createRoomDto);
  }

  async findAll() {
    return await this.roomModel.findAll()
  }

  async findOne(id: number) {
    const data = await this.roomModel.findOne({where: {id}})
    if(!data){
        throw new NotFoundException('room not found')
    }
    return data
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    await this.findOne(id)
    return await this.roomModel.update(updateRoomDto,{where:{id}});
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.roomModel.destroy({where:{id}})
  }
}
