import { Controller, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Database')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('reset')
  @ApiOperation({
    summary: 'Reset database',
    description: 'Xóa toàn bộ dữ liệu và tạo lại dữ liệu mặc định (chỉ dùng cho môi trường test)',
  })
  @ApiResponse({
    status: 200,
    description: 'Database đã được reset với dữ liệu mặc định',
  })
  async resetDatabase() {
    return this.databaseService.resetDatabase();
  }
}
