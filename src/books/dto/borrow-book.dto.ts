import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({ required: false, description: 'Optional notes about the borrowing' })
  @IsOptional()
  @IsString()
  notes?: string;
}
