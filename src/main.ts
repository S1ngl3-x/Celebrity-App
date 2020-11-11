import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/interceptors/excludeNull.interceptor';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate incoming data
  app.useGlobalInterceptors(new ExcludeNullInterceptor()); // strip null values from returned data
  app.use(cookieParser());
  app.use(helmet()); // middleware for secure HTTP headers
  app.enableCors();
  // app.use(csurf); // mitigate CSRF // not working currently
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // limit each IP to 300 requests per windowMs to prevent brute force
    }),
  );

  // init swagger
  const options = new DocumentBuilder()
    .setTitle('Celebrity Quiz')
    .setDescription('API for creating users and quizzes')
    .setVersion('1.0')
    .addTag('quiz')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
