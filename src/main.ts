import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.use(cookieParser());

   app.enableCors({
      origin: [
         'http://localhost:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
   });


   app.useGlobalPipes(
      new ValidationPipe({
         transform: true, // Automatically transform query params to DTO types
         whitelist: true, // Strip unknown properties
         forbidNonWhitelisted: true, // Throw an error if unknown properties are provided
      }),
   );

   const config = new DocumentBuilder()
      .setTitle('Her Conversation Api Documentation')
      .setDescription('The Her Conversation API description')
      .setVersion('1.0')
      .build();
   const documentFactory = () => SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api-doc', app, documentFactory);

   await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
