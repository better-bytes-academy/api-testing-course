import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity';
import { BorrowHistory } from './entities/borrow-history.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsModule } from './seeds/seeds.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Book, Category, BorrowHistory]),
    AuthModule,
    UsersModule,
    BooksModule,
    CategoriesModule,
    SeedsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
