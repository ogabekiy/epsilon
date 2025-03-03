import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { User } from 'src/users/user.model';
import { Course } from 'src/courses/course.model';

@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollment) private enrollmentModel: typeof Enrollment){}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const data = await this.enrollmentModel.findOne({where: {course_id: createEnrollmentDto.course_id,user_id: createEnrollmentDto.user_id}})
    if(data){
      throw new ConflictException('this couldnt be done')
    }
    return await this.enrollmentModel.create(createEnrollmentDto)
  }

  async findAll() {
    return await this.enrollmentModel.findAll({include: [{model: User},{model: Course}]});
  }

  async findOne(id: number) {
    const dataEnrollment = await this.enrollmentModel.findOne({where: {id}})
    if(!dataEnrollment){
      throw new NotFoundException('enrollment not found')
    }
    return dataEnrollment
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.enrollmentModel.destroy({where:{id}});
  }
}
