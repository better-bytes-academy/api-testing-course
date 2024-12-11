import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BorrowHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User, user => user.borrowHistory)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Book, book => book.borrowHistory)
  @ApiProperty({ type: () => Book })
  book: Book;

  @CreateDateColumn()
  @ApiProperty()
  borrowDate: Date;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  returnDate: Date;

  @Column({ default: false })
  @ApiProperty()
  isReturned: boolean;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  notes: string;
}
