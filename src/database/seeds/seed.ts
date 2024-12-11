import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { UserRole } from '../../entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  const users = [
    {
      username: 'admin',
      password: 'Test123!',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
    },
    {
      username: 'librarian',
      password: 'Test123!',
      email: 'librarian@example.com',
      role: UserRole.LIBRARIAN,
    },
    {
      username: 'user',
      password: 'Test123!',
      email: 'user@example.com',
      role: UserRole.USER,
    },
  ];

  console.log('Starting to seed users...');

  for (const userData of users) {
    try {
      const createUserDto = new CreateUserDto();
      Object.assign(createUserDto, userData);
      
      await authService.signUp(createUserDto);
      console.log(`Created user: ${userData.username}`);
    } catch (error) {
      if (error.message.includes('duplicate')) {
        console.log(`User ${userData.username} already exists`);
      } else {
        console.error(`Error creating user ${userData.username}:`, error.message);
      }
    }
  }

  console.log('Seeding completed');
  await app.close();
}

bootstrap();
