import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './lesson.model';
import { Course } from 'src/courses/course.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson,Course])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
