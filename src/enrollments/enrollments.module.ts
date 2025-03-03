import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
