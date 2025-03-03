import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { User } from 'src/users/user.model';
import { Category } from 'src/categories/category.model';
import { Room } from 'src/rooms/room.model';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course) private courseModel: typeof Course){}

  async create(createCourseDto: CreateCourseDto) {
    
    return await this.courseModel.create(createCourseDto);
  }

  async findAll() {
    return await this.courseModel.findAll({
      include: [
        { model: User, as: 'teacher' },
        { model: User, as: 'students' },
        { model: Category },
        { model: Room }
      ]
    });
  }

  async findOne(id: number) {
    const data = await this.courseModel.findOne({where: {id},include: [{model: User,as: 'teacher'},{model: User,as: 'students'}, {model: Category},{model: Room}]});
    if(!data){
      throw new NotFoundException('course not found')
    }
    return data
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id)
    return await this.courseModel.update(updateCourseDto,{where:{id}});
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.courseModel.destroy({where: {id}});
  }

  async end_course(id:number){
    const dataCourse = await this.findOne(id)
    dataCourse.status = 'completed'
    dataCourse.end_date = new Date()
    await dataCourse.save()

    return 'course is ended'
  }

}
