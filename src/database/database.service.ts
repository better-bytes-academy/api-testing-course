import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private authService: AuthService,
  ) {}

  async resetDatabase() {
    // Delete all records from all tables
    await this.bookRepository.delete({});
    await this.categoryRepository.delete({});
    await this.userRepository.delete({});

    // Create default users
    const defaultUsers = [
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

    for (const userData of defaultUsers) {
      const createUserDto = new CreateUserDto();
      Object.assign(createUserDto, userData);
      await this.authService.signUp(createUserDto);
    }

    // Create default categories
    const categories = await this.categoryRepository.save([
      { name: 'Văn học', description: 'Sách văn học Việt Nam và thế giới' },
      { name: 'Khoa học', description: 'Sách khoa học và công nghệ' },
      { name: 'Thiếu nhi', description: 'Sách dành cho thiếu nhi' },
    ]);

    // Create some sample books
    await this.bookRepository.save([
      {
        title: 'Truyện Kiều',
        author: 'Nguyễn Du',
        description: 'Tác phẩm văn học kinh điển Việt Nam',
        category: categories[0],
        isbn: '9781234567897',
        publishYear: 1820,
      },
      {
        title: 'Vật lý vui',
        author: 'Nhiều tác giả',
        description: 'Sách khoa học dành cho mọi lứa tuổi',
        category: categories[1],
        isbn: '9781234567898',
        publishYear: 2020,
      },
      {
        title: 'Dế Mèn phiêu lưu ký',
        author: 'Tô Hoài',
        description: 'Câu chuyện phiêu lưu của chú Dế Mèn',
        category: categories[2],
        isbn: '9781234567899',
        publishYear: 1941,
      },
    ]);

    return {
      message: 'Database has been reset with default data',
      defaultUsers,
      categories: categories.map(c => ({ name: c.name, description: c.description })),
      sampleBooks: ['Truyện Kiều', 'Vật lý vui', 'Dế Mèn phiêu lưu ký'],
    };
  }
}
