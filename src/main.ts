import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';
import { AlreadyExistsErrorFilter } from './app/errors/already-exists-error/already-exists-error.filter';
import { BadResquestErrorFilter } from './app/errors/bad-request-error/bad-request-error.filter';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedErrorFilter } from './app/errors/unauthorized-error/unauthorized-error.filter';
import { NotFoundErrorFilter } from './app/errors/not-found-error/not-found-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new AlreadyExistsErrorFilter(),
    new BadResquestErrorFilter(),
    new UnauthorizedErrorFilter(),
    new NotFoundErrorFilter()
  );

  await app.listen(3000);
}
bootstrap();
