import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './lesson.model';
import { Course } from 'src/courses/course.model';

@Injectable()
export class LessonsService {
  constructor(@InjectModel(Lesson) private lessonModel: typeof Lesson,
  @InjectModel(Course) private courseModel: typeof Course
  ){}
  async create(createLessonDto: CreateLessonDto) {
    const dataCourse = await this.courseModel.findOne({where: {id: createLessonDto.course_id}})
    if(!dataCourse){
      throw new NotFoundException('course with this id not found')
    }
    return await this.lessonModel.create(createLessonDto)
  }

  async findAll() {
    return await this.lessonModel.findAll({include:[{model: Course}]})
  }

  async findOne(id: number) {
    const data = await this.lessonModel.findOne({where :{id},include: [{model: Course}]})
    if(!data){
      throw new NotFoundException('lesson not found')
    }
    return data;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    await this.findOne(id)
    await this.lessonModel.update(updateLessonDto,{where: {id}})
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.lessonModel.destroy({where:{id}});
  }
}
