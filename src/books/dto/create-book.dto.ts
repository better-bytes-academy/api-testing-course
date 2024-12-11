import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'ISBN of the book' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ description: 'Description of the book', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Category ID of the book' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
