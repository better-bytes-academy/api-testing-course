import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({
    description: 'ID của danh mục',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tên danh mục sách',
    example: 'Văn học Việt Nam',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'Mô tả về danh mục sách',
    example: 'Các tác phẩm văn học Việt Nam từ cổ chí kim',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Book, book => book.category, { eager: true })
  @ApiProperty({
    description: 'Danh sách các cuốn sách thuộc danh mục này',
    type: () => Book,
    isArray: true,
  })
  books: Book[];

  @ApiProperty({
    description: 'Số lượng sách trong danh mục',
    example: 10,
  })
  @Column({ default: 0 })
  bookCount: number;

  @ApiProperty({
    description: 'Thời gian tạo danh mục',
    example: '2024-01-20T07:30:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Thời gian cập nhật danh mục gần nhất',
    example: '2024-01-20T08:45:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
