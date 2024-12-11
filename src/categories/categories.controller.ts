import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo danh mục mới' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Danh mục đã được tạo thành công.' })
  @ApiResponse({ status: 401, description: 'Không được phép: Token không hợp lệ.' })
  @ApiResponse({ status: 403, description: 'Bị cấm: Không đủ quyền.' })
  @ApiBadRequestResponse({ description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiConflictResponse({ description: 'Danh mục với tên này đã tồn tại' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả danh mục' })
  @ApiResponse({ status: 200, description: 'Danh sách danh mục được trả về thành công.' })
  @ApiResponse({ status: 200, description: 'Danh sách danh mục được trả về thành công.', type: [Category] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một danh mục theo ID' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiResponse({ status: 200, description: 'Danh mục được tìm thấy.', type: Category })
  @ApiResponse({ status: 404, description: 'Không tìm thấy danh mục.' })
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return category;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cập nhật thông tin danh mục' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Danh mục đã được cập nhật thành công.', type: Category })
  @ApiResponse({ status: 401, description: 'Không được phép: Token không hợp lệ.' })
  @ApiResponse({ status: 403, description: 'Bị cấm: Không đủ quyền.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy danh mục.' })
  @ApiBadRequestResponse({ description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiNotFoundResponse({ description: 'Danh mục không tìm thấy' })
  @ApiConflictResponse({ description: 'Danh mục với tên này đã tồn tại' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiResponse({ status: 200, description: 'Danh mục đã được xóa thành công.' })
  @ApiResponse({ status: 401, description: 'Không được phép: Token không hợp lệ.' })
  @ApiResponse({ status: 403, description: 'Bị cấm: Không đủ quyền.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy danh mục.' })
  @ApiConflictResponse({ description: 'Không thể xóa danh mục có sách' })
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return this.categoriesService.remove(+id);
  }
}
