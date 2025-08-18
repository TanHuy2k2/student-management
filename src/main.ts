import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './commons/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './commons/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalPipes(new ValidationPipe);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
