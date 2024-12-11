import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { InitialSeed } from './seeds/initial.seed'; // Assuming InitialSeed is located in initial.seed.ts

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Run seeds
  const initialSeed = app.get(InitialSeed);
  await initialSeed.seed();

  // Enable CORS
  app.enableCors();

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Setup validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Setup static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Hệ Thống Quản Lý Thư Viện')
    .setDescription('Tài liệu API cho Hệ Thống Quản Lý Thư Viện')
    .setVersion('1.0')
    .addTag('auth', 'API xác thực người dùng')
    .addTag('books', 'API quản lý sách')
    .addTag('categories', 'API quản lý danh mục')
    .addTag('users', 'API quản lý người dùng')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Nhập token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Ứng dụng đang chạy tại: http://localhost:${port}`);
  console.log(`Tài liệu API có sẵn tại: http://localhost:${port}/api/docs`);
}
bootstrap();
