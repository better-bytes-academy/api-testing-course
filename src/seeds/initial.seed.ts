import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Book } from '../entities/book.entity';
import { BookStatus } from '../entities/book.entity';

@Injectable()
export class InitialSeed {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async seed() {
    // Create categories
    const categories = [
      { name: 'Văn học Việt Nam', description: 'Sách văn học Việt Nam' },
      { name: 'Tiểu thuyết', description: 'Các tác phẩm tiểu thuyết' },
      { name: 'Khoa học', description: 'Sách khoa học và công nghệ' },
      { name: 'Kinh tế', description: 'Sách về kinh tế và kinh doanh' },
      { name: 'Tâm lý học', description: 'Sách về tâm lý và phát triển bản thân' },
      { name: 'Thiếu nhi', description: 'Sách dành cho thiếu nhi' },
      { name: 'Lịch sử', description: 'Sách về lịch sử' },
      { name: 'Nghệ thuật', description: 'Sách về nghệ thuật và văn hóa' },
      { name: 'Ngoại ngữ', description: 'Sách học ngoại ngữ' },
      { name: 'Kỹ năng sống', description: 'Sách về kỹ năng sống' },
    ];

    const savedCategories = [];
    for (const category of categories) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const newCategory = this.categoryRepository.create(category);
        savedCategories.push(await this.categoryRepository.save(newCategory));
      }
    }

    // Create books
    const books = [
      {
        title: 'Truyện Kiều',
        author: 'Nguyễn Du',
        isbn: '9781234567897',
        description: 'Tác phẩm văn học kinh điển của Việt Nam',
        category: savedCategories[0], // Văn học Việt Nam
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Số Đỏ',
        author: 'Vũ Trọng Phụng',
        isbn: '9781234567898',
        description: 'Tiểu thuyết châm biếm xã hội',
        category: savedCategories[0], // Văn học Việt Nam
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Dế Mèn Phiêu Lưu Ký',
        author: 'Tô Hoài',
        isbn: '9781234567899',
        description: 'Truyện thiếu nhi nổi tiếng',
        category: savedCategories[5], // Thiếu nhi
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Blockchain và Trí Tuệ Nhân Tạo',
        author: 'Nguyễn Văn A',
        isbn: '9781234567890',
        description: 'Sách về công nghệ hiện đại',
        category: savedCategories[2], // Khoa học
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Khởi Nghiệp Thông Minh',
        author: 'Trần B',
        isbn: '9781234567891',
        description: 'Hướng dẫn khởi nghiệp',
        category: savedCategories[3], // Kinh tế
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Đắc Nhân Tâm',
        author: 'Dale Carnegie',
        isbn: '9781234567892',
        description: 'Sách về nghệ thuật đối nhân xử thế',
        category: savedCategories[4], // Tâm lý học
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Lịch Sử Việt Nam',
        author: 'Nhiều tác giả',
        isbn: '9781234567893',
        description: 'Tổng quan về lịch sử Việt Nam',
        category: savedCategories[6], // Lịch sử
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Nghệ Thuật Sống Đẹp',
        author: 'Lê C',
        isbn: '9781234567894',
        description: 'Sách về nghệ thuật sống',
        category: savedCategories[7], // Nghệ thuật
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Tiếng Anh Giao Tiếp',
        author: 'Phạm D',
        isbn: '9781234567895',
        description: 'Sách học tiếng Anh',
        category: savedCategories[8], // Ngoại ngữ
        status: BookStatus.AVAILABLE,
      },
      {
        title: 'Kỹ Năng Quản Lý Thời Gian',
        author: 'Hoàng E',
        isbn: '9781234567896',
        description: 'Sách về quản lý thời gian hiệu quả',
        category: savedCategories[9], // Kỹ năng sống
        status: BookStatus.AVAILABLE,
      },
    ];

    for (const book of books) {
      const existingBook = await this.bookRepository.findOne({
        where: { isbn: book.isbn },
      });
      if (!existingBook) {
        const newBook = this.bookRepository.create(book);
        await this.bookRepository.save(newBook);
      }
    }

    console.log('Seed completed: Created categories and books');
  }
}
