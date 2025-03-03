import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs'
import { Course } from 'src/courses/course.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserModel: typeof User){}

  async create(createUserDto: CreateUserDto) {

    const data = await this.UserModel.findOne({where:{phone_number: createUserDto.phone_number}})
    if(data){
      throw new ForbiddenException('bu raqam bilan oldin royxatdan otilgan')
    }

    let hh_id: number;
        const maxAttempts = 15;
        let attempts = 0;

        do {
            if (attempts >= maxAttempts) {
                throw new Error('Unique hh_id could not be generated');
            }
            hh_id = Math.floor(10000 + Math.random() * 90000);
            const existingUserByHhId = await this.UserModel.findOne({
                where: { hh_id },
            });
            if (!existingUserByHhId) {
                break;
            }
            attempts++;
        } while (true);
    
    createUserDto.hh_id = hh_id

    createUserDto.password = await bcrypt.hash(createUserDto.password,10)
    return this.UserModel.create(createUserDto);
  }

  async findAll() {
    return await this.UserModel.findAll({include: [{model: Course,as: 'studentCourses'},{model: Course, as: 'teacherCourses'}]});
  }

  async findAllUsers(){
      return await this.UserModel.findAll({where: {role: 'user'},include: [{model: Course,as: 'studentCourses'}]})
  }

  async findByPhone(number:number){
    return await this.UserModel.findOne({where: {phone_number:number}})
  }

  async findOne(id: number) {
    const data = await this.UserModel.findOne({where: {id}})
    if(!data){
      throw new NotFoundException('user not found')
    }
    return await this.UserModel.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.UserModel.findOne({where: {id}})
    if(!data){
      throw new NotFoundException('user not found')
    }

    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password,10)
    }


    return await this.UserModel.update(updateUserDto,{where: {id}});
  }

  

  async remove(id: number) {
    const data = await this.UserModel.findOne({where: {id}})
    if(!data){
      throw new NotFoundException('user not found')
    }

    return await this.UserModel.destroy({where:{id}});
  }

  async setStatusFalse(id:number){
    const dataUser = await this.findOne(id)
    dataUser.active = false
    dataUser.save()
    return `now ${dataUser.first_name} is not active`
  }
}
