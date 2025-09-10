import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DateFormatInterceptor } from './common/interceptors/date-format.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
     app.enableCors({
       origin: [
         'http://localhost:4200',
         'https://presupuesto.democorpinterno.com'
       ], // Permite acceso desde frontend local y dominio externo
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  app.setGlobalPrefix("budgeSystem/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalInterceptors(new DateFormatInterceptor());

  await app.listen(3000); 
}
bootstrap();
