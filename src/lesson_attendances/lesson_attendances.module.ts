import { Module } from '@nestjs/common';
import { LessonAttendancesService } from './lesson_attendances.service';
import { LessonAttendancesController } from './lesson_attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonAttendace } from './lesson_attendance.model';
import { Lesson } from 'src/lessons/lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([LessonAttendace,Lesson])],
  controllers: [LessonAttendancesController],
  providers: [LessonAttendancesService],
})
export class LessonAttendancesModule {}
