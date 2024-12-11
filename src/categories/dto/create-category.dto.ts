import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục sách',
    example: 'Văn học Việt Nam',
  })
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @Length(2, 50, { message: 'Tên danh mục phải từ 2 đến 50 ký tự' })
  name: string;

  @ApiProperty({
    description: 'Mô tả về danh mục sách',
    example: 'Các tác phẩm văn học Việt Nam từ cổ chí kim',
  })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @Length(0, 500, { message: 'Mô tả không được vượt quá 500 ký tự' })
  description: string;
}
