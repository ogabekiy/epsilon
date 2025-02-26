import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.model';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from 'src/common/config/config.service';
@Injectable()
export class AuthsService {
  constructor(@InjectModel(User) private UserModel: typeof User,
  @Inject() private configService:ConfigService
  ){}
  async create(createAuthDto: CreateUserDto) {
   
 const data = await this.UserModel.findOne({where:{phone_number: createAuthDto.phone_number}})
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
 
  createAuthDto.hh_id = hh_id
  createAuthDto.password = await bcrypt.hash(createAuthDto.password,10)

    return this.UserModel.create(createAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto){
    const data = await this.UserModel.findOne({where:{phone_number:loginAuthDto.phone_number}})

    if(!data){
      throw new BadRequestException("password or email wrong")
    }

    const checkPassword = await bcrypt.compare(loginAuthDto.password,data.password)
    if(!checkPassword){
      throw new UnauthorizedException("valid email or password")
    }

    const token = await jwt.sign({phone_number: loginAuthDto.phone_number},this.configService.get('JWT_ACCESS_TOKEN'),{expiresIn: '1h'})

    return {data,token}  }


}
