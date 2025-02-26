import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {

  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe())

  app.useStaticAssets(path.join(__dirname, '..', 'profile_photos'), { prefix: '/profile_photos' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
