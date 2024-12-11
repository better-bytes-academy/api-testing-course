import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Book } from '../entities/book.entity';
import { InitialSeed } from './initial.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  providers: [InitialSeed],
  exports: [InitialSeed],
})
export class SeedsModule {}
