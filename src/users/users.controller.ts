import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { AuthGuard } from 'src/common/guards/authGuard';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/setProfile/:id')
  @UseInterceptors(FileInterceptor('profile_photo', { dest: './profile_photos' }))
  async setProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const userData = await this.usersService.findOne(+id);
    if (!userData) {
      throw new Error('User not found');
    }

    const uploadsDir = path.join(process.cwd(), 'profile_photos');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    if (userData.profile_photo) {
      const oldFilePath = path.join(process.cwd(), userData.profile_photo);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const userName = userData.first_name.replace(/\s+/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const newFileName = `${userName}-${randomSuffix}${path.extname(file.originalname)}`;
    const newFilePath = path.join(uploadsDir, newFileName);

    fs.renameSync(file.path, newFilePath);

    const imageUrl = `/profile_photos/${newFileName}`;

    const updatedUser = { ...userData, profile_photo: imageUrl };

    return await this.usersService.update(+id, updatedUser);
  }

  @Patch('/deleteProfile/:id')
  async deleteProfile(@Param('id') id: string) {
    const userData = await this.usersService.findOne(+id);
    if (!userData) {
      throw new Error('User not found');
    }

    if (userData.profile_photo) {
      const oldFilePath = path.join(process.cwd(), userData.profile_photo);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const updatedUser = { ...userData, profile_photo: '' };

    return await this.usersService.update(+id, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
