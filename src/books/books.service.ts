import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookStatus } from '../entities/book.entity';
import { User, UserRole } from '../entities/user.entity';
import { BorrowHistory } from '../entities/borrow-history.entity';
import { Category } from '../entities/category.entity';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BorrowHistory)
    private borrowHistoryRepository: Repository<BorrowHistory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto, user: User): Promise<Book> {
    // Only admin and librarian can create books
    if (![UserRole.ADMIN, UserRole.LIBRARIAN].includes(user.role)) {
      throw new UnauthorizedException('Only administrators and librarians can create books');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createBookDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const book = this.bookRepository.create({
      ...createBookDto,
      category,
      status: BookStatus.AVAILABLE,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async borrowBook(id: number, user: User, borrowBookDto: BorrowBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (book.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Book is not available for borrowing');
    }

    // Create borrow history record
    const borrowHistory = this.borrowHistoryRepository.create({
      user,
      book,
      notes: borrowBookDto.notes,
    });

    // Update book status
    book.status = BookStatus.BORROWED;
    
    await this.borrowHistoryRepository.save(borrowHistory);
    return this.bookRepository.save(book);
  }

  async returnBook(id: number, user: User): Promise<Book> {
    const book = await this.findOne(id);

    if (book.status !== BookStatus.BORROWED) {
      throw new BadRequestException('Book is not currently borrowed');
    }

    // Find active borrow record
    const borrowRecord = await this.borrowHistoryRepository.findOne({
      where: {
        book: { id },
        user: { id: user.id },
        isReturned: false,
      },
    });

    if (!borrowRecord) {
      throw new BadRequestException('Book was not borrowed by you');
    }

    // Update borrow record
    borrowRecord.isReturned = true;
    borrowRecord.returnDate = new Date();

    // Update book status
    book.status = BookStatus.AVAILABLE;

    await this.borrowHistoryRepository.save(borrowRecord);
    return this.bookRepository.save(book);
  }

  async findByCategory(categoryId: number): Promise<Book[]> {
    const books = await this.bookRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });

    if (!books || books.length === 0) {
      throw new NotFoundException('No books found in this category');
    }

    return books;
  }

  async updateBookStatus(id: number, status: BookStatus, user: User): Promise<Book> {
    // Only admin and librarian can mark books as destroyed
    if (![UserRole.ADMIN, UserRole.LIBRARIAN].includes(user.role)) {
      throw new UnauthorizedException('Only administrators and librarians can update book status');
    }

    const book = await this.findOne(id);
    book.status = status;
    return this.bookRepository.save(book);
  }
}
