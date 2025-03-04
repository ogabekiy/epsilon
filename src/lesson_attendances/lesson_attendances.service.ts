import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LessonAttendace } from './lesson_attendance.model';
import { Lesson } from 'src/lessons/lesson.model';

@Injectable()
export class LessonAttendancesService {
  constructor(@InjectModel(LessonAttendace) private lessonAttendaceModel: typeof LessonAttendace,
  @InjectModel(Lesson) private lessonModel: typeof Lesson
  ){}

  async create(createLessonAttendanceDto: CreateLessonAttendanceDto) {
    const dataLesson = await this.lessonModel.findOne({where: {id: createLessonAttendanceDto.lesson_id}})
    if(!dataLesson){
      throw new NotFoundException('lesson not found')
    }

    if(createLessonAttendanceDto.attendance_status === false){
      createLessonAttendanceDto.performance = 0
    }

    return await this.lessonAttendaceModel.create(createLessonAttendanceDto);
  }
  //git

  findAll() {
    return `This action returns all lessonAttendances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonAttendance`;
  }

  update(id: number, updateLessonAttendanceDto: UpdateLessonAttendanceDto) {
    return `This action updates a #${id} lessonAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonAttendance`;
  }
}
