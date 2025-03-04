import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonAttendancesService } from './lesson_attendances.service';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';

@Controller('lesson-attendances')
export class LessonAttendancesController {
  constructor(private readonly lessonAttendancesService: LessonAttendancesService) {}

  @Post()
  create(@Body() createLessonAttendanceDto: CreateLessonAttendanceDto) {
    return this.lessonAttendancesService.create(createLessonAttendanceDto);
  }

  @Get()
  findAll() {
    return this.lessonAttendancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonAttendancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonAttendanceDto: UpdateLessonAttendanceDto) {
    return this.lessonAttendancesService.update(+id, updateLessonAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonAttendancesService.remove(+id);
  }
}
