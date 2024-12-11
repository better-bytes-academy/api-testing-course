import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BorrowHistory } from './borrow-history.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  LIBRARIAN = 'librarian',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID của người dùng' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Tên đăng nhập' })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Đường dẫn ảnh đại diện', required: false })
  profilePicture: string;

  @OneToMany(() => BorrowHistory, borrowHistory => borrowHistory.user)
  borrowHistory: BorrowHistory[];
}
