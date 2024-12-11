import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { Roles } from '../auth/roles.decorator';
import { User, UserRole } from '../entities/user.entity';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookStatus } from '../entities/book.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo sách mới' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Sách đã được tạo thành công.' })
  @ApiResponse({ status: 401, description: 'Không được phép: Token không hợp lệ.' })
  @ApiResponse({ status: 403, description: 'Bị cấm: Không đủ quyền.' })
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.booksService.create(createBookDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả sách' })
  @ApiResponse({ status: 200, description: 'Danh sách sách được trả về thành công.' })
  getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một cuốn sách theo ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Sách được tìm thấy.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sách.' })
  async getBookById(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Không tìm thấy sách');
    }
    return book;
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Lấy danh sách sách theo danh mục' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Danh sách sách được trả về thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy danh mục.' })
  getBooksByCategory(@Param('categoryId') categoryId: number): Promise<Book[]> {
    return this.booksService.findByCategory(categoryId);
  }

  @Post(':id/borrow')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mượn sách' })
  @ApiParam({ name: 'id', description: 'Book ID to borrow' })
  @ApiBody({ type: BorrowBookDto })
  @ApiResponse({ status: 200, description: 'Sách đã được mượn thành công.' })
  @ApiResponse({ status: 400, description: 'Sách không khả dụng để mượn.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sách.' })
  async borrowBook(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() borrowBookDto: BorrowBookDto,
  ): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Không tìm thấy sách');
    }
    if (book.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Sách này hiện không khả dụng để mượn');
    }
    return this.booksService.borrowBook(id, user, borrowBookDto);
  }

  @Post(':id/return')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Trả sách' })
  @ApiParam({ name: 'id', description: 'Book ID to return' })
  @ApiResponse({ status: 200, description: 'Sách đã được trả thành công.' })
  @ApiResponse({ status: 400, description: 'Sách không ở trạng thái được mượn.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sách.' })
  async returnBook(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Không tìm thấy sách');
    }
    if (book.status !== BookStatus.BORROWED) {
      throw new BadRequestException('Sách này không ở trạng thái được mượn');
    }
    return this.booksService.returnBook(id, user);
  }

  @Patch(':id/mark-destroyed')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Đánh dấu sách đã bị hủy' })
  @ApiParam({ name: 'id', description: 'Book ID to mark as destroyed' })
  @ApiResponse({ status: 200, description: 'Sách đã được đánh dấu là bị hủy.' })
  @ApiResponse({ status: 401, description: 'Không được phép: Token không hợp lệ.' })
  @ApiResponse({ status: 403, description: 'Bị cấm: Không đủ quyền.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sách.' })
  async markBookAsDestroyed(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Không tìm thấy sách');
    }
    return this.booksService.updateBookStatus(id, BookStatus.DESTROYED, user);
  }
}
