import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('API for CRM system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
   
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

}
bootstrap();