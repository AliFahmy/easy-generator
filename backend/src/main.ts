import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(new ValidationPipe());
    console.log('Global Validation Pipe has been set up.');

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Easy Generator API')
      .setDescription('Easy Generator API Documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    console.log('Swagger documentation has been set up at /api');
    app.use(cookieParser());
    app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
      }),
    );
    const port = configService.get<number>('PORT') || 8080;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error(
      'Error during application startup:',
      error.message,
      error.stack,
    );
    process.exit(1);
  }
}

bootstrap();
