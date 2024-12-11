import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { BorrowHistory } from './borrow-history.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum BookStatus {
  AVAILABLE = 'available',
  BORROWED = 'borrowed',
  DESTROYED = 'destroyed'
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  author: string;

  @Column()
  @ApiProperty()
  isbn: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  description: string;

  @Column({
    type: 'simple-enum',
    enum: BookStatus,
    default: BookStatus.AVAILABLE
  })
  @ApiProperty({ enum: BookStatus })
  status: BookStatus;

  @ManyToOne(() => Category, category => category.books, { cascade: true })
  @ApiProperty({ type: () => Category })
  category: Category;

  @OneToMany(() => BorrowHistory, borrowHistory => borrowHistory.book)
  borrowHistory: BorrowHistory[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;
}
