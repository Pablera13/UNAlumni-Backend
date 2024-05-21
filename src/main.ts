/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const MyValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
  app.useGlobalPipes(MyValidationPipe);

  //para efectos de pruebas
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  });
  
  await app.listen(port, '0.0.0.0');
}
bootstrap();
