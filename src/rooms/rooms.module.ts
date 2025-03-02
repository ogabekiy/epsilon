import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './room.model';

@Module({
  imports: [SequelizeModule.forFeature([Room])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
