import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AllExceptionFilter } from './exception/all-exception.filter';
import { mockData } from './mock';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
    }),
  );

  // use exception filter
  app.useGlobalFilters(new AllExceptionFilter());

  await mockData(app);
  await app.listen(3000);
}

bootstrap();
